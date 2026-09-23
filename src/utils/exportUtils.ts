import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Clean cell text for tabular export
 */
function cleanCell(val: unknown): string {
  if (val === null || val === undefined) return '';
  return String(val).trim();
}

/**
 * Export data to standard CSV with UTF-8 BOM
 */
export function exportToCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const escapeCsv = (str: string) => {
    const s = cleanCell(str);
    if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const csvRows: string[] = [];
  csvRows.push(headers.map(escapeCsv).join(','));

  rows.forEach((row) => {
    csvRows.push(row.map((cell) => escapeCsv(String(cell))).join(','));
  });

  const csvContent = '\uFEFF' + csvRows.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export multi-sheet or single-sheet to real Excel (.xlsx)
 */
export function exportToExcel(
  filename: string,
  sheets: { sheetName: string; headers: string[]; rows: (string | number)[][] }[]
) {
  const wb = XLSX.utils.book_new();

  sheets.forEach((sheet) => {
    const data = [sheet.headers, ...sheet.rows.map((row) => row.map(cleanCell))];
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Auto-fit column widths
    const colWidths = sheet.headers.map((h, colIdx) => {
      let maxLen = h.length;
      sheet.rows.forEach((row) => {
        const val = cleanCell(row[colIdx]);
        if (val.length > maxLen) maxLen = Math.min(val.length, 55);
      });
      return { wch: Math.max(maxLen + 3, 12) };
    });
    ws['!cols'] = colWidths;

    // Clean sheet name (max 31 chars, no invalid chars)
    const validSheetName = sheet.sheetName.replace(/[:\\/?*[\]]/g, '_').substring(0, 31);
    XLSX.utils.book_append_sheet(wb, ws, validSheetName);
  });

  XLSX.writeFile(wb, filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`);
}

/**
 * Export structured compliance report to professional vector PDF
 */
export function exportToPdf(
  filename: string,
  title: string,
  subtitle: string,
  sections: { title?: string; headers: string[]; rows: (string | number)[][] }[]
) {
  // Use landscape for wide compliance tables with many columns
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Theme colors
  const primaryNavy = [15, 23, 42]; // #0F172A
  const slateText = [71, 85, 105]; // #475569

  // Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 297, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('AI SECURITY COMPLIANCE STANDARDS REPOSITORY', 14, 11);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`Generated: ${new Date().toLocaleDateString()} | Formal Audit Specification`, 14, 18);

  let currentY = 32;

  // Document Title & Subtitle
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, currentY);
  currentY += 6;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  const splitSub = doc.splitTextToSize(subtitle, 270);
  doc.text(splitSub, 14, currentY);
  currentY += splitSub.length * 4.5 + 4;

  // Render each section table
  sections.forEach((section, sIdx) => {
    if (section.title) {
      if (currentY > 175) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(section.title, 14, currentY);
      currentY += 4;
    }

    autoTable(doc, {
      startY: currentY,
      head: [section.headers],
      body: section.rows.map((row) => row.map(cleanCell)),
      theme: 'grid',
      headStyles: {
        fillColor: [30, 41, 59], // slate-800
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8,
        halign: 'left',
      },
      bodyStyles: {
        fontSize: 7.5,
        textColor: [51, 65, 85],
        cellPadding: 2,
        valign: 'top',
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252], // slate-50
      },
      margin: { left: 14, right: 14, bottom: 15 },
      didDrawPage: (data) => {
        // Footer page numbering
        const pageCount = (doc as any).internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount} — AI Security Compliance Standards`,
          14,
          202
        );
      },
    });

    const finalY = (doc as any).lastAutoTable?.finalY;
    if (finalY) {
      currentY = finalY + 8;
    } else {
      currentY += 15;
    }
  });

  doc.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
}
