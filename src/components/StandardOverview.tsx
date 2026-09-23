import { useState } from 'react';
import { Copy, Check, ShieldCheck, Shield } from 'lucide-react';
import { StandardMeta } from '../types';
import { CONTROLS_DATA } from '../data/standardsData';
import { RAW_MARKDOWN_DOCS } from '../data/rawMarkdown';
import { ExportMenu } from './ExportMenu';
import { exportToExcel, exportToCsv, exportToPdf } from '../utils/exportUtils';

interface StandardOverviewProps {
  meta: StandardMeta;
}

export function StandardOverview({ meta }: StandardOverviewProps) {
  const [copied, setCopied] = useState(false);

  const controls = CONTROLS_DATA[meta.id] || [];

  const handleCopySummary = async () => {
    const rawContent = RAW_MARKDOWN_DOCS[meta.id] || '';
    await navigator.clipboard.writeText(rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getExportData = () => {
    const headers = [
      'Clause / ID',
      'Title',
      'Category',
      'Impact / Severity',
      'Description',
      'Technical Requirements',
    ];
    const rows = controls.map((c) => [
      c.clauseOrRiskId,
      c.title,
      c.category,
      c.impactOrSeverity || 'Normative',
      c.description,
      c.technicalRequirements.join('; '),
    ]);
    return { headers, rows };
  };

  const handleExportExcel = () => {
    const { headers, rows } = getExportData();
    exportToExcel(`${meta.code.replace(/[^a-zA-Z0-9_-]/g, '_')}_Specification.xlsx`, [
      {
        sheetName: meta.code.substring(0, 31),
        headers,
        rows,
      },
    ]);
  };

  const handleExportCsv = () => {
    const { headers, rows } = getExportData();
    exportToCsv(`${meta.code.replace(/[^a-zA-Z0-9_-]/g, '_')}_Specification.csv`, headers, rows);
  };

  const handleExportPdf = () => {
    const { headers, rows } = getExportData();
    exportToPdf(
      `${meta.code.replace(/[^a-zA-Z0-9_-]/g, '_')}_Specification.pdf`,
      `${meta.name.toUpperCase()} (${meta.code})`,
      `${meta.subtitle} — Governing Authority: ${meta.authority}`,
      [
        {
          title: `Technical Controls & Audit Specifications (${controls.length} Controls)`,
          headers,
          rows,
        },
      ]
    );
  };

  return (
    <div id="standard-overview-card" className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${meta.badgeColor}`}>
              {meta.code}
            </span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600">
              {meta.category}
            </span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-500">
              Published {meta.year}
            </span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600">
              {meta.totalControls} Controls
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {meta.name}
          </h2>
          <p className="text-sm font-semibold text-slate-700">
            {meta.subtitle}
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
            {meta.summary}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-slate-600" />
            <span>Authority: <strong className="font-semibold text-slate-800">{meta.authority}</strong></span>
            <span className="text-slate-300">•</span>
            <Shield className="h-3.5 w-3.5 text-slate-600" />
            <span>Compliance Scope: <strong className="font-semibold text-slate-800">{meta.category}</strong></span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
          <button
            id="btn-copy-specification"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 active:scale-95"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-slate-500" />
                <span>Copy Specification</span>
              </>
            )}
          </button>

          <ExportMenu
            onExportExcel={handleExportExcel}
            onExportCsv={handleExportCsv}
            onExportPdf={handleExportPdf}
            buttonLabel="Export Standard"
            variant="primary"
            idPrefix={`standard-overview-export-${meta.id}`}
          />
        </div>
      </div>
    </div>
  );
}
