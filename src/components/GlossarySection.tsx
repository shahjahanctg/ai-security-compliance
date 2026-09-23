import { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Check,
  Copy,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Layers,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { GLOSSARY_ITEMS, GLOSSARY_CATEGORIES, GlossaryItem } from '../data/glossaryData';
import { ExportMenu } from './ExportMenu';
import { exportToExcel, exportToCsv, exportToPdf } from '../utils/exportUtils';

export function GlossarySection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      item.term.toLowerCase().includes(q) ||
      (item.acronym && item.acronym.toLowerCase().includes(q)) ||
      item.definition.toLowerCase().includes(q) ||
      item.relevance.toLowerCase().includes(q) ||
      item.recommendedAction.toLowerCase().includes(q) ||
      item.governingStandards.some((std) => std.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleCopyTerm = async (item: GlossaryItem) => {
    const text = `${item.term}${item.acronym ? ` (${item.acronym})` : ''}\nCategory: ${item.category}\n\nDefinition:\n${item.definition}\n\nEnterprise Relevance:\n${item.relevance}\n\nGoverning Standards:\n${item.governingStandards.join(', ')}\n\nRecommended Action:\n${item.recommendedAction}`;
    await navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportExcel = () => {
    const headers = [
      'Term',
      'Acronym',
      'Category',
      'Definition',
      'Enterprise Relevance',
      'Governing Standards',
      'Recommended Action',
    ];
    const rows = filteredItems.map((item) => [
      item.term,
      item.acronym || '',
      item.category,
      item.definition,
      item.relevance,
      item.governingStandards.join('; '),
      item.recommendedAction,
    ]);

    exportToExcel('AI_Security_Compliance_Glossary.xlsx', [
      {
        sheetName: 'AI Security Glossary',
        headers,
        rows,
      },
    ]);
  };

  const handleExportCsv = () => {
    const headers = [
      'Term',
      'Acronym',
      'Category',
      'Definition',
      'Enterprise Relevance',
      'Governing Standards',
      'Recommended Action',
    ];
    const rows = filteredItems.map((item) => [
      item.term,
      item.acronym || '',
      item.category,
      item.definition,
      item.relevance,
      item.governingStandards.join('; '),
      item.recommendedAction,
    ]);

    exportToCsv('AI_Security_Compliance_Glossary.csv', headers, rows);
  };

  const handleExportPdf = () => {
    const headers = ['Term & Acronym', 'Category', 'Definition & Governing Standards', 'Recommended Action'];
    const rows = filteredItems.map((item) => [
      `${item.term}${item.acronym ? ` (${item.acronym})` : ''}`,
      item.category,
      `${item.definition}\n\nStandards: ${item.governingStandards.join(', ')}`,
      item.recommendedAction,
    ]);

    exportToPdf(
      'AI_Security_Compliance_Glossary.pdf',
      'AI SECURITY & COMPLIANCE KEYWORD GLOSSARY',
      'Authoritative definitions and mitigation guidelines for essential AI safety, threat vectors, and risk governance terms.',
      [
        {
          title: `Glossary Terms (${filteredItems.length} items)`,
          headers,
          rows,
        },
      ]
    );
  };

  const getCategoryBadgeColor = (category: GlossaryItem['category']) => {
    switch (category) {
      case 'Threat Vectors & Vulnerabilities':
        return 'border-rose-200 bg-rose-50 text-rose-700';
      case 'Governance & Frameworks':
        return 'border-blue-200 bg-blue-50 text-blue-700';
      case 'Technical Defenses & Mitigations':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700';
      case 'Architecture & Engineering':
        return 'border-purple-200 bg-purple-50 text-purple-700';
      case 'Assurance, Audit & Testing':
        return 'border-amber-200 bg-amber-50 text-amber-700';
      default:
        return 'border-slate-200 bg-slate-50 text-slate-700';
    }
  };

  return (
    <div id="ai-security-glossary-section" className="space-y-5">
      {/* Header Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800">
                <BookOpen className="h-3.5 w-3.5 text-slate-600" />
                AI Security Knowledge Base
              </span>
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600">
                {GLOSSARY_ITEMS.length} Essential Keywords
              </span>
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                ISO • OWASP • NIST • IRGC • SANS
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              AI Security &amp; Compliance Keyword Glossary
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-3xl">
              An authoritative lexicon explaining the critical concepts, vulnerability vectors, regulatory principles, and defensive engineering practices referenced throughout international AI security standards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ExportMenu
              onExportExcel={handleExportExcel}
              onExportCsv={handleExportCsv}
              onExportPdf={handleExportPdf}
              buttonLabel="Export Glossary"
              variant="primary"
              idPrefix="glossary-export"
            />
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-5 flex flex-col gap-3 pt-4 border-t border-slate-100 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              id="glossary-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword, acronym, or standard..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-800 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="text-xs font-medium text-slate-500">
            Showing <strong className="text-slate-900">{filteredItems.length}</strong> of {GLOSSARY_ITEMS.length} terms
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2">
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1">
            <Filter className="h-3 w-3" />
            Category:
          </span>
          {GLOSSARY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`btn-glossary-cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Items List */}
      {filteredItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
          <ShieldAlert className="mx-auto h-10 w-10 text-slate-400" />
          <h3 className="mt-2 text-sm font-bold text-slate-900">No glossary terms match your search</h3>
          <p className="mt-1 text-xs text-slate-500">
            Try adjusting your search keywords or switching back to &quot;All&quot; categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`glossary-item-${item.id}`}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-md border px-2.5 py-0.5 text-xs font-semibold ${getCategoryBadgeColor(item.category)}`}>
                      {item.category}
                    </span>
                    {item.acronym && (
                      <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-800">
                        {item.acronym}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-base font-bold tracking-tight text-slate-900">
                    {item.term}
                  </h3>
                </div>

                <button
                  type="button"
                  id={`btn-copy-glossary-${item.id}`}
                  onClick={() => handleCopyTerm(item)}
                  className="inline-flex items-center gap-1 self-start rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
                  title="Copy definition and recommendations"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Definition */}
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {item.definition}
              </p>

              {/* Enterprise Relevance */}
              <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Why It Matters in Enterprise AI Security:
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-700">
                  {item.relevance}
                </p>
              </div>

              {/* Recommended Engineering Action */}
              <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50/40 p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Recommended Action &amp; Architecture:
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-700">
                  {item.recommendedAction}
                </p>
              </div>

              {/* Governing Standards Mapping */}
              <div className="mt-3.5 flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-500">Governing Standards:</span>
                {item.governingStandards.map((std, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
