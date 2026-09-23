import { useState, useRef, useEffect } from 'react';
import { Download, FileSpreadsheet, FileText, File, ChevronDown } from 'lucide-react';

interface ExportMenuProps {
  onExportExcel: () => void;
  onExportCsv: () => void;
  onExportPdf: () => void;
  buttonLabel?: string;
  variant?: 'primary' | 'secondary' | 'compact';
  idPrefix?: string;
}

export function ExportMenu({
  onExportExcel,
  onExportCsv,
  onExportPdf,
  buttonLabel = 'Export Report',
  variant = 'primary',
  idPrefix = 'export-menu',
}: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buttonClasses =
    variant === 'primary'
      ? 'bg-slate-900 text-white shadow-xs hover:bg-slate-800 active:scale-95'
      : variant === 'compact'
      ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:scale-95 shadow-xs'
      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:scale-95 shadow-xs';

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        id={`${idPrefix}-toggle-btn`}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${buttonClasses}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Download className="h-3.5 w-3.5" />
        <span>{buttonLabel}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          id={`${idPrefix}-dropdown`}
          className="absolute right-0 z-50 mt-1.5 w-48 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
        >
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Export Formats
          </div>

          <button
            type="button"
            id={`${idPrefix}-btn-excel`}
            onClick={() => {
              onExportExcel();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            role="menuitem"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
              <FileSpreadsheet className="h-3.5 w-3.5" />
            </div>
            <div className="text-left">
              <div className="font-semibold leading-tight">Excel Workbook</div>
              <div className="text-[10px] text-slate-400">.xlsx format</div>
            </div>
          </button>

          <button
            type="button"
            id={`${idPrefix}-btn-csv`}
            onClick={() => {
              onExportCsv();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            role="menuitem"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-50 text-sky-700">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <div className="text-left">
              <div className="font-semibold leading-tight">CSV Spreadsheet</div>
              <div className="text-[10px] text-slate-400">.csv (UTF-8 BOM)</div>
            </div>
          </button>

          <button
            type="button"
            id={`${idPrefix}-btn-pdf`}
            onClick={() => {
              onExportPdf();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            role="menuitem"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-50 text-rose-700">
              <File className="h-3.5 w-3.5" />
            </div>
            <div className="text-left">
              <div className="font-semibold leading-tight">Audit PDF Document</div>
              <div className="text-[10px] text-slate-400">Formatted vector .pdf</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
