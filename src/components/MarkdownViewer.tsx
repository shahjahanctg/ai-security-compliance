import { useState } from 'react';
import {
  Copy,
  Download,
  Check,
  Table as TableIcon,
  Code2,
  Search,
  FileSpreadsheet,
} from 'lucide-react';
import { StandardMeta } from '../types';
import { TABULAR_STANDARDS_DATA, StandardTableDoc } from '../data/tabularStandardsData';

interface MarkdownViewerProps {
  meta: StandardMeta;
}

export function MarkdownViewer({ meta }: MarkdownViewerProps) {
  const [copied, setCopied] = useState(false);
  const [viewSource, setViewSource] = useState(false);
  const [tableSearch, setTableSearch] = useState('');

  const tableData: StandardTableDoc = TABULAR_STANDARDS_DATA[meta.id];

  // Helper to generate pure Markdown Table string
  const generateMarkdownTableText = (): string => {
    if (!tableData) return '';
    let md = `# ${tableData.standardName}\n`;
    md += `## Structural Compliance & Technical Controls Specification (Table Format)\n\n`;
    md += `**Standard Identifier:** ${tableData.code}  \n`;
    md += `**Documentation Format:** Structured Technical Verification Tables  \n`;
    md += `**Generated:** ${new Date().toISOString().split('T')[0]}  \n\n`;
    md += `---\n\n`;

    tableData.sections.forEach((sec) => {
      md += `### ${sec.title}\n`;
      md += `*${sec.description}*\n\n`;
      md += `| ${sec.headers.join(' | ')} |\n`;
      md += `| ${sec.headers.map(() => ':---').join(' | ')} |\n`;
      sec.rows.forEach((row) => {
        const cleanedRow = row.map((cell) => cell.replace(/\|/g, '\\|'));
        md += `| ${cleanedRow.join(' | ')} |\n`;
      });
      md += `\n---\n\n`;
    });

    return md;
  };

  const fullMarkdownTableText = generateMarkdownTableText();

  const handleCopyMarkdown = async () => {
    await navigator.clipboard.writeText(fullMarkdownTableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTableMd = () => {
    const blob = new Blob([fullMarkdownTableText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${meta.id}_structural_tables.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalSections = tableData?.sections.length || 0;
  const totalRows = tableData?.sections.reduce((acc, s) => acc + s.rows.length, 0) || 0;

  return (
    <div id="table-structural-documentation-container" className="space-y-4">
      {/* File & Control Action Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800">
                <FileSpreadsheet className="h-3.5 w-3.5 text-slate-600" />
                Structural Table Format
              </span>
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600">
                {totalSections} Comprehensive Tables
              </span>
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-mono font-medium text-slate-600">
                {totalRows} Total Standard Items
              </span>
            </div>
            <h3 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900">
              {tableData?.standardName}
            </h3>
            <p className="text-xs text-slate-500">
              Structured tabular layout detailing all normative clauses, vulnerability attack vectors, technical specifications, and audit evidence.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search within tables */}
            <div className="relative w-full sm:w-56">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                id="search-inside-tables"
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Search table rows..."
                className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-800 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Toggle Table View vs Source Markdown */}
            <button
              id="btn-toggle-table-source"
              onClick={() => setViewSource(!viewSource)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 active:scale-95"
            >
              {viewSource ? (
                <>
                  <TableIcon className="h-3.5 w-3.5 text-slate-600" />
                  <span>Visual Table</span>
                </>
              ) : (
                <>
                  <Code2 className="h-3.5 w-3.5 text-slate-600" />
                  <span>Markdown Source</span>
                </>
              )}
            </button>

            {/* Copy Table as Markdown */}
            <button
              id="btn-copy-table-md"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied Table!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  <span>Copy Markdown Table</span>
                </>
              )}
            </button>

            {/* Download Table .md */}
            <button
              id="btn-download-table-md"
              onClick={handleDownloadTableMd}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 active:scale-95"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Table (.md)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Tables or Raw Monospace */}
      {viewSource ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-mono text-slate-500">
              Raw Table Markdown Output ({fullMarkdownTableText.split('\n').length} lines)
            </span>
            <span className="text-xs font-medium text-slate-400">Format: Standard GFM Pipe Tables</span>
          </div>
          <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-800">
            {fullMarkdownTableText}
          </pre>
        </div>
      ) : (
        <div className="space-y-6">
          {tableData?.sections.map((section, sIdx) => {
            const query = tableSearch.toLowerCase().trim();
            const filteredRows = section.rows.filter((row) => {
              if (!query) return true;
              return row.some((cell) => cell.toLowerCase().includes(query));
            });

            return (
              <div
                key={sIdx}
                id={`table-section-${sIdx}`}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs"
              >
                {/* Table Section Title Bar */}
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="text-sm font-bold tracking-tight text-slate-900">
                      {section.title}
                    </h4>
                    <span className="text-xs font-medium text-slate-500">
                      {filteredRows.length} of {section.rows.length} rows matching
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-600">
                    {section.description}
                  </p>
                </div>

                {/* The Responsive Structural Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100/70 font-semibold text-slate-700">
                        {section.headers.map((header, hIdx) => (
                          <th
                            key={hIdx}
                            className={`p-3.5 whitespace-nowrap text-xs font-semibold ${
                              hIdx === 0 ? 'w-28' : hIdx === 1 ? 'w-48' : ''
                            }`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredRows.length === 0 ? (
                        <tr>
                          <td
                            colSpan={section.headers.length}
                            className="p-8 text-center text-xs text-slate-500"
                          >
                            No matching rows found in this table for &quot;{tableSearch}&quot;.
                          </td>
                        </tr>
                      ) : (
                        filteredRows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="transition-colors hover:bg-slate-50/80"
                          >
                            {row.map((cell, cIdx) => {
                              // Highlight primary identifiers (col 0)
                              if (cIdx === 0) {
                                return (
                                  <td key={cIdx} className="p-3.5 align-top font-mono font-bold text-slate-900 whitespace-nowrap">
                                    <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs">
                                      {cell}
                                    </span>
                                  </td>
                                );
                              }

                              // Format title/name (col 1)
                              if (cIdx === 1) {
                                return (
                                  <td key={cIdx} className="p-3.5 align-top font-semibold text-slate-900">
                                    {cell}
                                  </td>
                                );
                              }

                              // Format severity tags if present
                              if (cell === 'Critical' || cell === 'High' || cell === 'Moderate' || cell === 'Low') {
                                const badgeColor =
                                  cell === 'Critical'
                                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                                    : cell === 'High'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-sky-50 text-sky-700 border-sky-200';
                                return (
                                  <td key={cIdx} className="p-3.5 align-top whitespace-nowrap">
                                    <span className={`rounded-md border px-2 py-0.5 font-semibold text-xs ${badgeColor}`}>
                                      {cell}
                                    </span>
                                  </td>
                                );
                              }

                              // General text cell
                              return (
                                <td key={cIdx} className="p-3.5 align-top leading-relaxed text-slate-700">
                                  {cell}
                                </td>
                              );
                            })}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
