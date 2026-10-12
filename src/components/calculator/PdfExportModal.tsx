import React, { useState } from 'react';
import { CalculationInput, SplitCalculationResult } from '../../types/proptds';
import { generatePropTdsPdf } from '../../lib/pdfGenerator';
import { formatINR } from '../../lib/formatters';
import { X, FileText, CheckCircle2, ShieldCheck, Download, Award, Sparkles } from 'lucide-react';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  input: CalculationInput;
  result: SplitCalculationResult;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  input,
  result,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isOpen) return null;

  const handleDownload = (isCertified: boolean) => {
    setDownloading(true);
    try {
      generatePropTdsPdf(input, result, isCertified);
      setSuccessNotice(true);
      setTimeout(() => {
        setSuccessNotice(false);
        onClose();
      }, 1500);
    } catch (e) {
      console.error('PDF Generation failed:', e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-6 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Form 26QB Export
            </span>
            <span className="text-xs text-slate-400">PDF A4 Vector Format</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Export Challan Filing Packet & Certificate
          </h3>
          <p className="text-xs text-slate-500">
            Download an offline, printable PDF report containing the complete multi-party breakdown and compliance checklist.
          </p>
        </div>

        {/* Docket Preview Specs */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3 text-xs">
          <div className="flex items-center justify-between text-slate-700">
            <span>Property Valuation Considered:</span>
            <span className="font-semibold tabular-nums">{formatINR(result.totalPropertyBase)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-700">
            <span>Total Base TDS (1%):</span>
            <span className="font-semibold text-emerald-700 tabular-nums">{formatINR(result.totalBaseTds)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-700">
            <span>Unique Form 26QB Filings:</span>
            <span className="font-semibold">{result.challanRecords.length} Challan(s)</span>
          </div>
          <div className="flex items-center justify-between text-slate-700">
            <span>Compliance Status:</span>
            <span className={`font-semibold ${result.penalty.isOverdue ? 'text-amber-700' : 'text-emerald-700'}`}>
              {result.penalty.isOverdue ? `Overdue (${result.penalty.delayDays} days)` : 'On-Time Filing'}
            </span>
          </div>
        </div>

        {/* Feature inclusions */}
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Exact Buyer-Seller pair-wise split breakdown table</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Section 50C Circle Rate vs Agreement valuation analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Section 234E late fee & 201(1A) statutory penalty breakdown</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Step-by-step e-Pay Tax portal copy schedule for deed writers & CAs</span>
          </div>
        </div>

        {/* Success feedback */}
        {successNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 text-center font-semibold">
            ✓ PDF generated successfully! Downloading file...
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            disabled={downloading}
            onClick={() => handleDownload(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Generating PDF...' : 'Download Certified Filing Docket'}
          </button>
        </div>

        <p className="text-[11px] text-slate-400 text-center">
          Generated client-side in your browser. Zero data transmitted over the internet.
        </p>
      </div>
    </div>
  );
};
