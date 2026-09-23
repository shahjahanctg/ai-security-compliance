/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShieldCheck, Database, Bookmark } from 'lucide-react';
import { StandardId, ActiveTab } from './types';
import { STANDARDS_META, CONTROLS_DATA, CROSS_FRAMEWORK_MAPPINGS } from './data/standardsData';
import { GLOSSARY_ITEMS } from './data/glossaryData';
import { Header } from './components/Header';
import { StandardOverview } from './components/StandardOverview';
import { ControlsExplorer } from './components/ControlsExplorer';
import { MarkdownViewer } from './components/MarkdownViewer';
import { CrossFrameworkMatrix } from './components/CrossFrameworkMatrix';
import { ComplianceAuditChecklist } from './components/ComplianceAuditChecklist';
import { GlossarySection } from './components/GlossarySection';
import { ExportMenu } from './components/ExportMenu';
import { exportToExcel, exportToCsv, exportToPdf } from './utils/exportUtils';

export default function App() {
  const [activeStandard, setActiveStandard] = useState<StandardId>('iso-42001');
  const [activeTab, setActiveTab] = useState<ActiveTab>('controls');
  const [searchQuery, setSearchQuery] = useState('');

  const currentMeta = STANDARDS_META[activeStandard];
  const currentControls = CONTROLS_DATA[activeStandard] || [];

  const standardsList: StandardId[] = [
    'iso-42001',
    'owasp-llm',
    'irgc-governance',
    'sans-ir',
    'nist-ai-rmf',
  ];

  // Full repository multi-sheet Excel export
  const handleExportAllExcel = () => {
    // Sheet 1: Frameworks Overview
    const overviewHeaders = ['Standard Code', 'Full Name', 'Authority', 'Year', 'Category', 'Total Controls', 'Executive Summary'];
    const overviewRows = standardsList.map((id) => {
      const meta = STANDARDS_META[id];
      return [meta.code, meta.name, meta.authority, meta.year, meta.category, meta.totalControls, meta.summary];
    });

    const sheets = [
      {
        sheetName: 'Standards Overview',
        headers: overviewHeaders,
        rows: overviewRows,
      },
    ];

    // Sheets 2-6: Each Framework's Controls
    standardsList.forEach((id) => {
      const meta = STANDARDS_META[id];
      const controls = CONTROLS_DATA[id] || [];
      const headers = ['Clause / ID', 'Control Title', 'Category', 'Impact / Severity', 'Description', 'Technical Requirements'];
      const rows = controls.map((c) => [
        c.clauseOrRiskId,
        c.title,
        c.category,
        c.impactOrSeverity || 'Normative',
        c.description,
        c.technicalRequirements.join('; '),
      ]);

      sheets.push({
        sheetName: meta.code.substring(0, 31).replace(/[:\\/?*[\]]/g, '_'),
        headers,
        rows,
      });
    });

    // Sheet 7: Cross-Framework Harmonization Matrix
    const matrixHeaders = ['Domain', 'ISO/IEC 42001', 'OWASP Top 10 LLM', 'NIST AI RMF 1.0', 'IRGC Framework', 'SANS AI IR', 'Recommended Action'];
    const matrixRows = CROSS_FRAMEWORK_MAPPINGS.map((m) => [
      m.domain,
      m.iso42001,
      m.owaspLLM,
      m.nistAiRmf,
      m.irgcPhase,
      m.sansIrPhase,
      m.recommendedAction,
    ]);
    sheets.push({
      sheetName: 'Harmonization Matrix',
      headers: matrixHeaders,
      rows: matrixRows,
    });

    // Sheet 8: Glossary
    const glossaryHeaders = ['Term', 'Acronym', 'Category', 'Definition', 'Enterprise Relevance', 'Governing Standards', 'Recommended Action'];
    const glossaryRows = GLOSSARY_ITEMS.map((g) => [
      g.term,
      g.acronym || '',
      g.category,
      g.definition,
      g.relevance,
      g.governingStandards.join('; '),
      g.recommendedAction,
    ]);
    sheets.push({
      sheetName: 'AI Security Glossary',
      headers: glossaryHeaders,
      rows: glossaryRows,
    });

    exportToExcel('Complete_AI_Security_Compliance_Repository.xlsx', sheets);
  };

  // Full repository consolidated CSV export
  const handleExportAllCsv = () => {
    const headers = ['Standard Code', 'Standard Name', 'Clause / ID', 'Title', 'Category', 'Severity / Impact', 'Description', 'Technical Requirements'];
    const rows: (string | number)[][] = [];

    standardsList.forEach((id) => {
      const meta = STANDARDS_META[id];
      const controls = CONTROLS_DATA[id] || [];
      controls.forEach((c) => {
        rows.push([
          meta.code,
          meta.name,
          c.clauseOrRiskId,
          c.title,
          c.category,
          c.impactOrSeverity || 'Normative',
          c.description,
          c.technicalRequirements.join('; '),
        ]);
      });
    });

    exportToCsv('Complete_AI_Security_Compliance_Repository.csv', headers, rows);
  };

  // Full repository comprehensive PDF export
  const handleExportAllPdf = () => {
    const overviewHeaders = ['Standard Code', 'Framework Name', 'Authority', 'Category', 'Controls'];
    const overviewRows = standardsList.map((id) => {
      const meta = STANDARDS_META[id];
      return [meta.code, meta.name, meta.authority, meta.category, meta.totalControls];
    });

    const matrixHeaders = ['Domain', 'ISO 42001', 'OWASP LLM', 'NIST AI RMF', 'IRGC', 'SANS IR', 'Recommended Architecture'];
    const matrixRows = CROSS_FRAMEWORK_MAPPINGS.map((m) => [
      m.domain,
      m.iso42001,
      m.owaspLLM,
      m.nistAiRmf,
      m.irgcPhase,
      m.sansIrPhase,
      m.recommendedAction,
    ]);

    const glossaryHeaders = ['Keyword', 'Category', 'Definition & Governing Standards'];
    const glossaryRows = GLOSSARY_ITEMS.slice(0, 15).map((g) => [
      `${g.term}${g.acronym ? ` (${g.acronym})` : ''}`,
      g.category,
      `${g.definition}\nStandards: ${g.governingStandards.join(', ')}`,
    ]);

    exportToPdf(
      'Complete_AI_Security_Compliance_Repository.pdf',
      'AI SECURITY COMPLIANCE STANDARDS: COMPLETE REPOSITORY',
      'Executive multi-framework reference: ISO/IEC 42001, OWASP Top 10 for LLM, NIST AI RMF 1.0, IRGC, and SANS AI IR.',
      [
        {
          title: 'Section 1: Framework Overview & Governance Authorities',
          headers: overviewHeaders,
          rows: overviewRows,
        },
        {
          title: 'Section 2: Cross-Framework Harmonization Matrix',
          headers: matrixHeaders,
          rows: matrixRows,
        },
        {
          title: 'Section 3: Core AI Security Keyword Glossary (Key Highlights)',
          headers: glossaryHeaders,
          rows: glossaryRows,
        },
      ]
    );
  };

  return (
    <div id="ai-compliance-app" className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col selection:bg-slate-200">
      {/* Top App Header */}
      <Header
        activeStandard={activeStandard}
        onSelectStandard={(id) => {
          setActiveStandard(id);
        }}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 space-y-6">
        {/* Banner: Repository Status & Export Menu */}
        <div id="repository-banner" className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-slate-900">
                  Enterprise AI Security Compliance Suite
                </p>
                <span className="rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-700">
                  Audit Ready
                </span>
              </div>
              <p className="text-xs text-slate-500">
                5 Governing Frameworks • 104 Total Controls • Harmonized Matrix • Keyword Glossary
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('glossary')}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'glossary'
                  ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>Keyword Glossary</span>
            </button>

            <ExportMenu
              onExportExcel={handleExportAllExcel}
              onExportCsv={handleExportAllCsv}
              onExportPdf={handleExportAllPdf}
              buttonLabel="Export Full Repository"
              variant="primary"
              idPrefix="full-repo-export"
            />
          </div>
        </div>

        {/* View Mode Switching */}
        {activeTab === 'glossary' ? (
          <GlossarySection />
        ) : activeTab === 'matrix' ? (
          <CrossFrameworkMatrix />
        ) : (
          <div className="space-y-6">
            {/* Standard Overview Card */}
            <StandardOverview meta={currentMeta} />

            {/* Dynamic Content based on Active Tab */}
            {activeTab === 'controls' && (
              <ControlsExplorer
                meta={currentMeta}
                controls={currentControls}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'markdown' && (
              <MarkdownViewer meta={currentMeta} />
            )}

            {activeTab === 'checklist' && (
              <ComplianceAuditChecklist
                meta={currentMeta}
                controls={currentControls}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-slate-600" />
            <span className="font-semibold text-slate-800">
              AI Security Compliance Standards Repository
            </span>
            <span className="text-slate-400">•</span>
            <span>ISO 42001, OWASP LLM, IRGC, SANS, NIST AI RMF</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('glossary')}
              className="hover:text-slate-900 font-medium transition-colors"
            >
              Glossary of Key Terms
            </button>
            <span className="text-slate-300">•</span>
            <p className="text-slate-500">
              Exports available in Excel (.xlsx), CSV (.csv), and PDF (.pdf).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
