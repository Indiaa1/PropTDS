import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculationInput, SplitCalculationResult } from '../types/proptds';
import { formatDateDisplay, formatINR } from './formatters';

export function generatePropTdsPdf(
  input: CalculationInput,
  result: SplitCalculationResult,
  isCertifiedDocket = true
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Colors
  const primaryNavy = [15, 23, 42]; // #0F172A
  const slate600 = [71, 85, 105];
  const emerald700 = [4, 120, 87];
  const amber700 = [180, 83, 9];
  const borderGray = [226, 232, 240];

  // Header Banner
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('PropTDS | Form 26QB Challan Split Certificate', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text('Statutory Section 194-IA Compliance & Multi-Party Filing Docket', 14, 18);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} | Status: Verified Zero-Math Computation`,
    14,
    23
  );

  if (isCertifiedDocket) {
    doc.setFillColor(4, 120, 87);
    doc.roundedRect(pageWidth - 52, 8, 38, 12, 1.5, 1.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('OFFICIAL DOCKET', pageWidth - 49, 13);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.text('Pre-Filing Verification', pageWidth - 49, 17.5);
  }

  let y = 35;

  // Section 1: Property Valuation & Consideration Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('1. Financial Valuation & Statutory Threshold Audit', 14, y);
  y += 5;

  const valData = [
    [
      'Total Agreement Consideration',
      formatINR(input.agreementValue),
      'Stamp Duty / Circle Rate Valuation',
      formatINR(input.circleRateValue),
    ],
    [
      'Current Tranche / Installment Amount',
      formatINR(result.totalGrossTranche),
      'Taxable Valuation Base Applied (Max)',
      formatINR(result.totalPropertyBase),
    ],
    [
      'Higher Value Basis Rule Applied',
      result.isCircleRateHigher
        ? 'Stamp Duty (Circle Rate) is higher (Sec 50C)'
        : 'Agreement Value is higher / equal',
      'Section 194-IA Applicability (>= ₹50L)',
      result.isApplicable ? 'MANDATORY (Property >= 50 Lakhs)' : 'EXEMPT (Property < 50 Lakhs)',
    ],
  ];

  autoTable(doc, {
    startY: y,
    head: [],
    body: valData,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2.2,
      textColor: [30, 41, 59],
      lineColor: borderGray as [number, number, number],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [248, 250, 252], cellWidth: 50 },
      1: { cellWidth: 40 },
      2: { fontStyle: 'bold', fillColor: [248, 250, 252], cellWidth: 55 },
      3: { cellWidth: 45 },
    },
    margin: { left: 14, right: 14 },
  });

  // @ts-expect-error autoTable adds lastAutoTable to doc
  y = doc.lastAutoTable.finalY + 7;

  // Section 2: Parties Co-Ownership Matrix
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('2. Co-Ownership Details & Unique Challans Required', 14, y);
  y += 5;

  const buyerSummary = input.buyers
    .map((b, i) => `${b.name || `Buyer ${i + 1}`} (${b.sharePercentage}%)`)
    .join(', ');
  const sellerSummary = input.sellers
    .map((s, i) => `${s.name || `Seller ${i + 1}`} (${s.sharePercentage}%)`)
    .join(', ');

  const partyData = [
    ['Buyer(s) & Share Distribution', buyerSummary],
    ['Seller(s) & Share Distribution', sellerSummary],
    [
      'Total Form 26QB Filings Required',
      `${result.challanRecords.length} unique challan(s) required (${input.buyers.length} Buyer(s) × ${input.sellers.length} Seller(s))`,
    ],
  ];

  autoTable(doc, {
    startY: y,
    head: [],
    body: partyData,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2.2,
      textColor: [30, 41, 59],
      lineColor: borderGray as [number, number, number],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [248, 250, 252], cellWidth: 55 },
      1: { cellWidth: 135 },
    },
    margin: { left: 14, right: 14 },
  });

  // @ts-expect-error autoTable adds lastAutoTable to doc
  y = doc.lastAutoTable.finalY + 7;

  // Section 3: Statutory Compliance & Penalty Timelines
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('3. Statutory Due Date & Delay Penalty Audit (Sections 234E & 201)', 14, y);
  y += 5;

  const p = result.penalty;
  const complianceData = [
    [
      'Date of Payment / Credit',
      formatDateDisplay(input.paymentDate),
      'Statutory Deposit Due Date',
      p.formattedDueDate || 'N/A',
    ],
    [
      'Actual / Target Deposit Date',
      formatDateDisplay(input.depositDate),
      'Compliance Status',
      p.isOverdue ? `OVERDUE by ${p.delayDays} day(s)` : 'ON-TIME (No Penalty)',
    ],
    [
      'Section 234E Late Filing Fee (₹200/day)',
      p.isLateFeeCapped
        ? `${formatINR(p.payableLateFee234E)} (Capped at 100% of TDS)`
        : formatINR(p.payableLateFee234E),
      'Section 201(1A) Interest (1.5%/month)',
      `${formatINR(p.payableInterest201)} (${p.interestMonths201} month(s))`,
    ],
  ];

  autoTable(doc, {
    startY: y,
    head: [],
    body: complianceData,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2.2,
      textColor: [30, 41, 59],
      lineColor: borderGray as [number, number, number],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [248, 250, 252], cellWidth: 55 },
      1: { cellWidth: 40 },
      2: { fontStyle: 'bold', fillColor: [248, 250, 252], cellWidth: 50 },
      3: { cellWidth: 45 },
    },
    margin: { left: 14, right: 14 },
  });

  // @ts-expect-error autoTable adds lastAutoTable to doc
  y = doc.lastAutoTable.finalY + 7;

  // Section 4: Individual Pair-Wise Challan Schedule
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('4. Form 26QB Pair-Wise Challan Filing Schedule', 14, y);
  y += 5;

  const tableHeaders = [
    '#',
    'Buyer',
    'Seller',
    'Share',
    'Gross (₹)',
    'Base TDS (1%)',
    'Sec 234E',
    'Sec 201',
    'Total Challan',
    'Net to Seller',
  ];

  const tableRows = result.challanRecords.map((r) => [
    r.challanNumber.toString(),
    r.buyerName,
    r.sellerName,
    `${r.pairSharePercentage.toFixed(1)}%`,
    formatINR(r.grossAmount).replace('₹', ''),
    formatINR(r.baseTds).replace('₹', ''),
    formatINR(r.lateFee234E).replace('₹', ''),
    formatINR(r.interest201).replace('₹', ''),
    formatINR(r.totalChallanAmount).replace('₹', ''),
    formatINR(r.netPayableToSeller).replace('₹', ''),
  ]);

  // Total summary row
  const totalGross = result.challanRecords.reduce((s, r) => s + r.grossAmount, 0);
  const totalBaseTds = result.challanRecords.reduce((s, r) => s + r.baseTds, 0);
  const totalLateFee = result.challanRecords.reduce((s, r) => s + r.lateFee234E, 0);
  const totalInterest = result.challanRecords.reduce((s, r) => s + r.interest201, 0);
  const totalChallan = result.challanRecords.reduce((s, r) => s + r.totalChallanAmount, 0);
  const totalNet = result.challanRecords.reduce((s, r) => s + r.netPayableToSeller, 0);

  tableRows.push([
    'TOTAL',
    '-',
    '-',
    '100%',
    formatINR(totalGross).replace('₹', ''),
    formatINR(totalBaseTds).replace('₹', ''),
    formatINR(totalLateFee).replace('₹', ''),
    formatINR(totalInterest).replace('₹', ''),
    formatINR(totalChallan).replace('₹', ''),
    formatINR(totalNet).replace('₹', ''),
  ]);

  autoTable(doc, {
    startY: y,
    head: [tableHeaders],
    body: tableRows,
    theme: 'striped',
    headStyles: {
      fillColor: primaryNavy as [number, number, number],
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
      halign: 'center',
    },
    styles: {
      fontSize: 7,
      cellPadding: 2,
      halign: 'right',
      lineColor: borderGray as [number, number, number],
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 8 },
      1: { halign: 'left', cellWidth: 24 },
      2: { halign: 'left', cellWidth: 24 },
      3: { halign: 'center', cellWidth: 14 },
      4: { cellWidth: 20 },
      5: { cellWidth: 20 },
      6: { cellWidth: 16 },
      7: { cellWidth: 16 },
      8: { fontStyle: 'bold', cellWidth: 22 },
      9: { cellWidth: 22 },
    },
    didParseCell: (data) => {
      // Bold the total row
      if (data.row.index === tableRows.length - 1) {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fillColor = [241, 245, 249];
      }
    },
    margin: { left: 14, right: 14 },
  });

  // @ts-expect-error autoTable adds lastAutoTable to doc
  y = doc.lastAutoTable.finalY + 7;

  // If page height exceeded, add page
  if (y > pageHeight - 35) {
    doc.addPage();
    y = 20;
  }

  // Section 5: Portal e-Filing Instructions & Legal Note
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('5. Income Tax Portal (e-Pay Tax / TIN 2.0) Filing Instructions', 14, y);
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(slate600[0], slate600[1], slate600[2]);
  const instructions = [
    '1. Log in to Income Tax e-Filing Portal (incometax.gov.in) with Buyer PAN credentials.',
    '2. Navigate to: e-File -> e-Pay Tax -> New Payment -> Select "TDS on Sale of Property (Form 26QB)".',
    '3. Enter Seller PAN, verify name, select property type, and enter exact amounts from this schedule.',
    '4. Repeat distinct Form 26QB filing for each row listed in Section 4 above.',
    '5. Pay challan via UPI / Netbanking. Download Challan Receipt (CRN) for each payment.',
    '6. Within 15-20 days, log in to TRACES portal (tdscpc.gov.in) to download Form 16B and issue to Seller.',
  ];

  instructions.forEach((line) => {
    doc.text(line, 14, y);
    y += 3.5;
  });

  // Footer Disclaimer
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text(
    'Statutory Disclaimer: PropTDS is an independent computational utility. This certificate does not constitute chartered accountancy or tax advice. Not affiliated with the Directorate of Income Tax (Systems) or TRACES. Verify deed figures with your registrar document.',
    14,
    pageHeight - 8,
    { maxWidth: pageWidth - 28 }
  );

  // Save the PDF
  doc.save(`PropTDS_Form26QB_Split_Schedule_${Date.now()}.pdf`);
}
