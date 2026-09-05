import { useState } from 'react';
import { Download, Copy, Check, ShieldCheck, FileCode } from 'lucide-react';
import { StandardMeta } from '../types';
import { RAW_MARKDOWN_DOCS } from '../data/rawMarkdown';

interface StandardOverviewProps {
  meta: StandardMeta;
}

export function StandardOverview({ meta }: StandardOverviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = async () => {
    const rawContent = RAW_MARKDOWN_DOCS[meta.id] || '';
    await navigator.clipboard.writeText(rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const rawContent = RAW_MARKDOWN_DOCS[meta.id] || '';
    const blob = new Blob([rawContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', meta.markdownFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
            <FileCode className="h-3.5 w-3.5 text-slate-600" />
            <span>File: <code className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-slate-800">{meta.markdownFileName}</code></span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
          <button
            id="btn-copy-markdown"
            onClick={handleCopyMarkdown}
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
                <span>Copy Markdown</span>
              </>
            )}
          </button>

          <button
            id="btn-download-markdown"
            onClick={handleDownloadFile}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-95"
          >
            <Download className="h-4 w-4" />
            <span>Download .md</span>
          </button>
        </div>
      </div>
    </div>
  );
}
