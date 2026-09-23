import { useState } from 'react';
import { CheckCircle2, Clock, AlertCircle, RotateCcw } from 'lucide-react';
import { StandardMeta, ControlItem } from '../types';
import { ExportMenu } from './ExportMenu';
import { exportToExcel, exportToCsv, exportToPdf } from '../utils/exportUtils';

interface ComplianceAuditChecklistProps {
  meta: StandardMeta;
  controls: ControlItem[];
}

export function ComplianceAuditChecklist({ meta, controls }: ComplianceAuditChecklistProps) {
  // Local state for compliance statuses
  const [statuses, setStatuses] = useState<Record<string, 'compliant' | 'in_progress' | 'not_started'>>(() => {
    const initial: Record<string, 'compliant' | 'in_progress' | 'not_started'> = {};
    controls.forEach((c, idx) => {
      // Seed initial realistic compliance state (first 2 compliant, next in progress, rest not started)
      if (idx === 0 || idx === 1) initial[c.id] = 'compliant';
      else if (idx === 2) initial[c.id] = 'in_progress';
      else initial[c.id] = 'not_started';
    });
    return initial;
  });

  const total = controls.length;
  const compliantCount = Object.values(statuses).filter((s) => s === 'compliant').length;
  const inProgressCount = Object.values(statuses).filter((s) => s === 'in_progress').length;
  const notStartedCount = Object.values(statuses).filter((s) => s === 'not_started').length;
  const readinessPercent = Math.round((compliantCount / (total || 1)) * 100);

  const toggleStatus = (id: string, newStatus: 'compliant' | 'in_progress' | 'not_started') => {
    setStatuses((prev) => ({ ...prev, [id]: newStatus }));
  };

  const resetAll = () => {
    const fresh: Record<string, 'compliant' | 'in_progress' | 'not_started'> = {};
    controls.forEach((c) => {
      fresh[c.id] = 'not_started';
    });
    setStatuses(fresh);
  };

  const getAuditTableData = () => {
    const headers = ['Clause / ID', 'Title', 'Compliance Status', 'Primary Requirement', 'Scope Category'];
    const rows = controls.map((c) => {
      const statusLabel =
        statuses[c.id] === 'compliant'
          ? 'COMPLIANT'
          : statuses[c.id] === 'in_progress'
          ? 'IN PROGRESS'
          : 'GAP / NOT STARTED';
      return [
        c.clauseOrRiskId,
        c.title,
        statusLabel,
        c.technicalRequirements[0] || c.description,
        c.category,
      ];
    });
    return { headers, rows };
  };

  const handleExportExcel = () => {
    const { headers, rows } = getAuditTableData();
    const summaryHeaders = ['Metric', 'Value'];
    const summaryRows = [
      ['Standard', `${meta.name} (${meta.code})`],
      ['Total Controls Audited', total],
      ['Compliant Items', compliantCount],
      ['In Progress Items', inProgressCount],
      ['Compliance Gaps', notStartedCount],
      ['Overall Readiness Score', `${readinessPercent}%`],
      ['Audit Timestamp', new Date().toISOString()],
    ];

    exportToExcel(`${meta.code.replace(/[^a-zA-Z0-9_-]/g, '_')}_Audit_Report.xlsx`, [
      {
        sheetName: 'Audit Summary',
        headers: summaryHeaders,
        rows: summaryRows,
      },
      {
        sheetName: 'Controls Checklist',
        headers,
        rows,
      },
    ]);
  };

  const handleExportCsv = () => {
    const { headers, rows } = getAuditTableData();
    exportToCsv(`${meta.code.replace(/[^a-zA-Z0-9_-]/g, '_')}_Audit_Report.csv`, headers, rows);
  };

  const handleExportPdf = () => {
    const { headers, rows } = getAuditTableData();
    exportToPdf(
      `${meta.code.replace(/[^a-zA-Z0-9_-]/g, '_')}_Audit_Report.pdf`,
      `COMPLIANCE AUDIT READINESS REPORT: ${meta.code}`,
      `Readiness Score: ${readinessPercent}% | Compliant: ${compliantCount}/${total} | In Progress: ${inProgressCount} | Gaps: ${notStartedCount}`,
      [
        {
          title: `Audit Evaluation Checklist (${total} Controls)`,
          headers,
          rows,
        },
      ]
    );
  };

  return (
    <div id="compliance-checklist-section" className="space-y-4">
      {/* Summary Scorecard */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Audit Readiness Assessment
            </span>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">
              {meta.code} Compliance Gap Analysis
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
              <span>Reset</span>
            </button>
            <ExportMenu
              onExportExcel={handleExportExcel}
              onExportCsv={handleExportCsv}
              onExportPdf={handleExportPdf}
              buttonLabel="Export Audit Report"
              variant="primary"
              idPrefix={`audit-checklist-export-${meta.id}`}
            />
          </div>
        </div>

        {/* Progress Bar & Breakdown */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-medium text-slate-700">
            <span>Overall Alignment Readiness</span>
            <span className="font-bold text-slate-900">{readinessPercent}%</span>
          </div>
          <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 flex border border-slate-200/60">
            <div
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{ width: `${(compliantCount / total) * 100}%` }}
            />
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${(inProgressCount / total) * 100}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
              <span className="text-slate-600">
                Compliant: <strong className="text-slate-800">{compliantCount}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-600">
                In Progress: <strong className="text-slate-800">{inProgressCount}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="text-slate-600">
                Gap / Not Started: <strong className="text-slate-800">{notStartedCount}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Checklist Table */}
      <div className="space-y-2">
        {controls.map((item) => {
          const status = statuses[item.id] || 'not_started';
          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-800">
                    {item.clauseOrRiskId}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h4>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {item.technicalRequirements[0] || item.description}
                </p>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleStatus(item.id, 'compliant')}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    status === 'compliant'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Compliant</span>
                </button>

                <button
                  onClick={() => toggleStatus(item.id, 'in_progress')}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    status === 'in_progress'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  <span>In Progress</span>
                </button>

                <button
                  onClick={() => toggleStatus(item.id, 'not_started')}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    status === 'not_started'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Gap</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
