/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Download, Files, ShieldCheck, Check } from 'lucide-react';
import { StandardId } from './types';
import { STANDARDS_META, CONTROLS_DATA } from './data/standardsData';
import { RAW_MARKDOWN_DOCS } from './data/rawMarkdown';
import { Header } from './components/Header';
import { StandardOverview } from './components/StandardOverview';
import { ControlsExplorer } from './components/ControlsExplorer';
import { MarkdownViewer } from './components/MarkdownViewer';
import { CrossFrameworkMatrix } from './components/CrossFrameworkMatrix';
import { ComplianceAuditChecklist } from './components/ComplianceAuditChecklist';

export default function App() {
  const [activeStandard, setActiveStandard] = useState<StandardId>('iso-42001');
  const [activeTab, setActiveTab] = useState<'controls' | 'markdown' | 'matrix' | 'checklist'>('controls');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadedAll, setDownloadedAll] = useState(false);

  const currentMeta = STANDARDS_META[activeStandard];
  const currentControls = CONTROLS_DATA[activeStandard] || [];

  const handleDownloadAll = () => {
    const standards: StandardId[] = [
      'iso-42001',
      'owasp-llm',
      'irgc-governance',
      'sans-ir',
      'nist-ai-rmf',
    ];

    standards.forEach((id, index) => {
      setTimeout(() => {
        const meta = STANDARDS_META[id];
        const content = RAW_MARKDOWN_DOCS[id];
        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', meta.markdownFileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, index * 250);
    });

    setDownloadedAll(true);
    setTimeout(() => setDownloadedAll(false), 3000);
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
        {/* Banner: Repository Status & Batch Download */}
        <div id="repository-banner" className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <Files className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                5 Standard Documentation Files Available
              </p>
              <p className="text-xs text-slate-500">
                Created in <code className="font-mono text-slate-700 bg-slate-100 px-1 py-0.5 rounded border border-slate-200">/docs/</code> and project root directory
              </p>
            </div>
          </div>

          <button
            id="btn-download-all-standards"
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
          >
            {downloadedAll ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Downloaded All 5 Files!</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5 text-slate-500" />
                <span>Download All 5 .md Files</span>
              </>
            )}
          </button>
        </div>

        {/* View Mode Switching */}
        {activeTab === 'matrix' ? (
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
          <p className="text-slate-500">
            Standardized technical controls and governance alignment for high-assurance AI architectures.
          </p>
        </div>
      </footer>
    </div>
  );
}
