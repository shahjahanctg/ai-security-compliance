import { useState } from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2, Filter } from 'lucide-react';
import { ControlItem, StandardMeta } from '../types';

interface ControlsExplorerProps {
  meta: StandardMeta;
  controls: ControlItem[];
  searchQuery: string;
}

export function ControlsExplorer({ meta, controls, searchQuery }: ControlsExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(controls.map((c) => c.category)))];

  // Filter controls based on category & search query
  const filteredControls = controls.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      item.title.toLowerCase().includes(query) ||
      item.clauseOrRiskId.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.technicalRequirements.some((req) => req.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const getSeverityBadge = (severity?: string) => {
    switch (severity) {
      case 'Critical':
        return 'border-rose-200 bg-rose-50 text-rose-700';
      case 'High':
        return 'border-amber-200 bg-amber-50 text-amber-700';
      case 'Moderate':
        return 'border-sky-200 bg-sky-50 text-sky-700';
      default:
        return 'border-slate-200 bg-slate-50 text-slate-600';
    }
  };

  return (
    <div id="controls-explorer-section" className="space-y-4">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-3">
        <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1">
          <Filter className="h-3 w-3" />
          Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-xs font-medium text-slate-500">
          Showing {filteredControls.length} of {controls.length} controls
        </span>
      </div>

      {/* Controls Grid */}
      {filteredControls.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <ShieldAlert className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-2 text-sm font-semibold text-slate-900">
            No controls match your search criteria
          </p>
          <p className="text-xs text-slate-500">
            Try adjusting your search query or selecting &quot;All&quot; categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredControls.map((item) => (
            <div
              key={item.id}
              id={`control-card-${item.id}`}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-slate-300"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-900">
                      {item.clauseOrRiskId}
                    </span>
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {item.category}
                    </span>
                    {item.impactOrSeverity && (
                      <span className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${getSeverityBadge(item.impactOrSeverity)}`}>
                        {item.impactOrSeverity}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 text-base font-bold tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                </div>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>

              {/* Technical Requirements / Countermeasures */}
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50/80 p-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Technical Specifications &amp; Implementation Requirements:
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {item.technicalRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-800" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cross-Mapped Standards */}
              {item.mappedStandards && item.mappedStandards.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs font-medium text-slate-500">Cross-Mapped:</span>
                  {item.mappedStandards.map((map, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                    >
                      <span className="font-semibold text-slate-800">{map.standard}</span>
                      <ArrowRight className="h-2.5 w-2.5 text-slate-400" />
                      <span className="font-mono text-slate-700">{map.targetId}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
