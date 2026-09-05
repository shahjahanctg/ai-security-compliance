import { Shield, Search, FileText, CheckSquare, Layers, BookOpen } from 'lucide-react';
import { StandardId } from '../types';
import { STANDARDS_META } from '../data/standardsData';

interface HeaderProps {
  activeStandard: StandardId;
  onSelectStandard: (id: StandardId) => void;
  activeTab: 'controls' | 'markdown' | 'matrix' | 'checklist';
  onSelectTab: (tab: 'controls' | 'markdown' | 'matrix' | 'checklist') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({
  activeStandard,
  onSelectStandard,
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const standardsList: StandardId[] = [
    'iso-42001',
    'owasp-llm',
    'irgc-governance',
    'sans-ir',
    'nist-ai-rmf',
  ];

  return (
    <header id="compliance-header" className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        {/* Brand and Search */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-900">
                  AI Security Standards Repository
                </h1>
                <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                  5 Frameworks
                </span>
              </div>
              <p className="text-xs text-slate-500">
                ISO 42001 • OWASP Top 10 LLM • IRGC • SANS AI IR • NIST AI RMF
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search controls, clauses, risks..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs sm:text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-slate-800 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Standards Navigation Pills */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {standardsList.map((id) => {
            const meta = STANDARDS_META[id];
            const isSelected = activeStandard === id;
            return (
              <button
                key={id}
                id={`btn-nav-standard-${id}`}
                onClick={() => onSelectStandard(id)}
                className={`flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {meta.code}
              </button>
            );
          })}
        </div>

        {/* View Mode Tabs */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1 border-t border-slate-100 pt-2 text-xs">
          <button
            id="tab-controls-explorer"
            onClick={() => onSelectTab('controls')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors ${
              activeTab === 'controls'
                ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Controls &amp; Clauses Explorer</span>
          </button>

          <button
            id="tab-markdown-viewer"
            onClick={() => onSelectTab('markdown')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors ${
              activeTab === 'markdown'
                ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Table Structural Documentation</span>
          </button>

          <button
            id="tab-cross-matrix"
            onClick={() => onSelectTab('matrix')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors ${
              activeTab === 'matrix'
                ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Cross-Framework Mapping</span>
          </button>

          <button
            id="tab-compliance-checklist"
            onClick={() => onSelectTab('checklist')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors ${
              activeTab === 'checklist'
                ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" />
            <span>Audit Readiness Checklist</span>
          </button>
        </div>
      </div>
    </header>
  );
}
