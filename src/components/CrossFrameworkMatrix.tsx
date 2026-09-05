import { useState } from 'react';
import { Search, Copy, Check, Table2, Info } from 'lucide-react';
import { CROSS_FRAMEWORK_MAPPINGS } from '../data/standardsData';

export function CrossFrameworkMatrix() {
  const [filter, setFilter] = useState('');
  const [copied, setCopied] = useState(false);

  const filtered = CROSS_FRAMEWORK_MAPPINGS.filter((m) => {
    const q = filter.toLowerCase().trim();
    return (
      q === '' ||
      m.domain.toLowerCase().includes(q) ||
      m.iso42001.toLowerCase().includes(q) ||
      m.owaspLLM.toLowerCase().includes(q) ||
      m.nistAiRmf.toLowerCase().includes(q) ||
      m.irgcPhase.toLowerCase().includes(q) ||
      m.sansIrPhase.toLowerCase().includes(q) ||
      m.recommendedAction.toLowerCase().includes(q)
    );
  });

  const handleCopyMarkdownTable = async () => {
    let md = '| Security & Governance Domain | ISO/IEC 42001 | OWASP Top 10 LLM | NIST AI RMF 1.0 | IRGC Framework | SANS AI IR & CTI | Recommended Architecture & Action |\n';
    md += '|:---|:---|:---|:---|:---|:---|:---|\n';
    CROSS_FRAMEWORK_MAPPINGS.forEach((row) => {
      md += `| **${row.domain}** | ${row.iso42001} | ${row.owaspLLM} | ${row.nistAiRmf} | ${row.irgcPhase} | ${row.sansIrPhase} | ${row.recommendedAction} |\n`;
    });
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="cross-matrix-section" className="space-y-4">
      {/* Header & Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Table2 className="h-5 w-5 text-slate-800" />
            <h3 className="text-base font-bold tracking-tight text-slate-900">
              Multi-Standard Cross-Framework Compliance Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Unified control harmonization mapping across ISO 42001, OWASP LLM, NIST AI RMF, IRGC, and SANS IR
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-60">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter domains or controls..."
              className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-800 focus:bg-white focus:outline-none"
            />
          </div>

          <button
            onClick={handleCopyMarkdownTable}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
            <span>{copied ? 'Copied Table' : 'Copy Table'}</span>
          </button>
        </div>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-100/70 p-3 text-xs text-slate-700">
        <Info className="h-4 w-4 flex-shrink-0 text-slate-700 mt-0.5" />
        <p>
          <strong className="text-slate-900">Unified Audit Alignment:</strong> Implementing technical mitigations for <em className="font-medium text-slate-900">OWASP Top 10 LLM</em> and <em className="font-medium text-slate-900">NIST AI RMF</em> simultaneously satisfies the normative technical control objectives of <em className="font-medium text-slate-900">ISO/IEC 42001 Annex A</em> and provides baseline telemetry for the <em className="font-medium text-slate-900">SANS AI Incident Response lifecycle</em>.
        </p>
      </div>

      {/* Mapping Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/70 font-semibold text-slate-700">
              <th className="p-3.5 min-w-[180px]">Security / Risk Domain</th>
              <th className="p-3.5 min-w-[130px]">ISO/IEC 42001</th>
              <th className="p-3.5 min-w-[150px]">OWASP Top 10 LLM</th>
              <th className="p-3.5 min-w-[140px]">NIST AI RMF 1.0</th>
              <th className="p-3.5 min-w-[140px]">IRGC Framework</th>
              <th className="p-3.5 min-w-[160px]">SANS AI IR &amp; CTI</th>
              <th className="p-3.5 min-w-[240px]">Recommended Architecture &amp; Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-900">
                  {row.domain}
                </td>
                <td className="p-3.5 font-mono text-slate-800">
                  {row.iso42001}
                </td>
                <td className="p-3.5 font-semibold text-rose-700">
                  {row.owaspLLM}
                </td>
                <td className="p-3.5 font-mono text-slate-800">
                  {row.nistAiRmf}
                </td>
                <td className="p-3.5 text-slate-700">
                  {row.irgcPhase}
                </td>
                <td className="p-3.5 font-mono text-slate-800">
                  {row.sansIrPhase}
                </td>
                <td className="p-3.5 leading-relaxed text-slate-600">
                  {row.recommendedAction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
