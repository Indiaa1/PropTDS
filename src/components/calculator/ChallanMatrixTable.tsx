import React, { useState } from 'react';
import { ChallanSplitRecord, SplitCalculationResult, CalculationInput } from '../../types/proptds';
import { formatINR } from '../../lib/formatters';
import { Copy, Check, Download, FileText, Share2, Layers } from 'lucide-react';

interface ChallanMatrixTableProps {
  input: CalculationInput;
  result: SplitCalculationResult;
  onOpenPdfModal: () => void;
}

export const ChallanMatrixTable: React.FC<ChallanMatrixTableProps> = ({
  input,
  result,
  onOpenPdfModal,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const { challanRecords, isApplicable, isBuyerShareValid, isSellerShareValid } = result;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyRowSummary = (r: ChallanSplitRecord) => {
    const text = `${r.buyerName} → ${r.sellerName} | Gross: ${formatINR(r.grossAmount)} | Taxable Base: ${formatINR(r.taxableBase)} | Base TDS (1%): ${formatINR(r.baseTds)} | Sec 234E Fee: ${formatINR(r.lateFee234E)} | Sec 201 Interest: ${formatINR(r.interest201)} | Total Challan: ${formatINR(r.totalChallanAmount)} | Net to Seller: ${formatINR(r.netPayableToSeller)}`;
    copyToClipboard(text, `row_${r.id}`);
  };

  const copyPortalFieldValues = (r: ChallanSplitRecord) => {
    const text = `INCOME TAX PORTAL FORM 26QB COPY SCHEDULE:
• Buyer / Transferee: ${r.buyerName} (Share: ${r.buyerShare}%)
• Seller / Transferor: ${r.sellerName} (Share: ${r.sellerShare}%)
• Total Consideration for Property: ${formatINR(input.agreementValue)}
• Stamp Duty Value: ${formatINR(input.circleRateValue)}
• Amount Paid/Credited currently: ${formatINR(r.grossAmount)}
• Rate of TDS: 1%
• TDS Amount: ${formatINR(r.baseTds)}
• Fee under Section 234E: ${formatINR(r.lateFee234E)}
• Interest under Section 201: ${formatINR(r.interest201)}
• Total Amount Payable: ${formatINR(r.totalChallanAmount)}
• Net Consideration Payable to Transferor: ${formatINR(r.netPayableToSeller)}`;
    copyToClipboard(text, `portal_${r.id}`);
  };

  const copyDeedWriterSchedule = () => {
    const lines = [
      '=====================================================',
      'TDS DEDUCTION SCHEDULE UNDER SECTION 194-IA (FOR SALE DEED)',
      '=====================================================',
      `Agreement Consideration: ${formatINR(input.agreementValue)}`,
      `Stamp Duty Valuation: ${formatINR(input.circleRateValue)}`,
      `Higher Valuation Adopted: ${formatINR(result.totalPropertyBase)}`,
      `Total Statutory TDS (1%): ${formatINR(result.totalBaseTds)}`,
      `Total Net Consideration to Transferors: ${formatINR(result.totalNetToSellers)}`,
      '-----------------------------------------------------',
      'PAIR-WISE FORM 26QB BREAKDOWN:',
      ...challanRecords.map(
        (r) =>
          `Challan #${r.challanNumber}: From [${r.buyerName}] to [${r.sellerName}] | Share: ${r.pairSharePercentage.toFixed(2)}% | Gross: ${formatINR(r.grossAmount)} | TDS Deducted: ${formatINR(r.baseTds)} | Net Paid: ${formatINR(r.netPayableToSeller)}`
      ),
      '=====================================================',
    ];
    copyToClipboard(lines.join('\n'), 'deed_schedule');
    setCopiedFormat('deed');
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  if (!isApplicable) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          TDS Under Section 194-IA Not Applicable
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          The property valuation ({formatINR(result.totalPropertyBase)}) is under the ₹50 Lakh statutory threshold limit. Neither TDS deduction nor Form 26QB filing is required.
        </p>
      </div>
    );
  }

  if (!isBuyerShareValid || !isSellerShareValid) {
    return (
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-8 text-center space-y-3">
        <h3 className="text-base font-bold text-amber-900">
          Adjust Co-Ownership Shares to 100%
        </h3>
        <p className="text-xs text-amber-800 max-w-md mx-auto">
          {result.validationError || 'Buyer or seller shares do not sum to 100%. Adjust shares in Step 2 to view the pair-wise challan matrix.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>4. Pair-Wise Form 26QB Challan Filing Schedule</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Every unique buyer-seller combination ({challanRecords.length} total) requires a separate 26QB filing on the Income Tax Portal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copyDeedWriterSchedule}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {copiedId === 'deed_schedule' ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-slate-500" />
            )}
            Copy Deed Text
          </button>

          <button
            type="button"
            onClick={onOpenPdfModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors cursor-pointer min-h-[34px]"
            title="Download formal A4 Form 26QB Challan Split Certificate PDF"
          >
            <Download className="w-3.5 h-3.5" />
            Download Challan PDF
          </button>
        </div>
      </div>

      {/* Table for Desktop / Tablet */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <th className="py-2.5 px-3 w-10 text-center">#</th>
              <th className="py-2.5 px-3">Buyer (Transferee)</th>
              <th className="py-2.5 px-3">Seller (Transferor)</th>
              <th className="py-2.5 px-3 text-center">Share</th>
              <th className="py-2.5 px-3 text-right">Gross Tranche</th>
              <th className="py-2.5 px-3 text-right">Base TDS (1%)</th>
              <th className="py-2.5 px-3 text-right">Sec 234E</th>
              <th className="py-2.5 px-3 text-right">Sec 201</th>
              <th className="py-2.5 px-3 text-right font-bold text-slate-900">Total Challan</th>
              <th className="py-2.5 px-3 text-right">Net to Seller</th>
              <th className="py-2.5 px-3 text-center w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {challanRecords.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-3 text-center font-mono font-medium text-slate-400">
                  {r.challanNumber}
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-900">{r.buyerName}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{r.buyerShare}% share</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-900">{r.sellerName}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{r.sellerShare}% share</div>
                </td>
                <td className="py-3 px-3 text-center font-mono font-semibold text-slate-700">
                  {r.pairSharePercentage.toFixed(1)}%
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-slate-700">
                  {formatINR(r.grossAmount)}
                </td>
                <td className="py-3 px-3 text-right tabular-nums font-semibold text-emerald-700">
                  {formatINR(r.baseTds)}
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-slate-600">
                  {formatINR(r.lateFee234E)}
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-slate-600">
                  {formatINR(r.interest201)}
                </td>
                <td className="py-3 px-3 text-right tabular-nums font-bold text-slate-900 bg-slate-50/50">
                  {formatINR(r.totalChallanAmount)}
                </td>
                <td className="py-3 px-3 text-right tabular-nums font-medium text-slate-800">
                  {formatINR(r.netPayableToSeller)}
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => copyPortalFieldValues(r)}
                      title="Copy all Form 26QB fields for Income Tax Portal"
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                    >
                      {copiedId === `portal_${r.id}` ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyRowSummary(r)}
                      title="Copy 1-line row summary"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                    >
                      {copiedId === `row_${r.id}` ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100/80 font-bold border-t border-slate-200 text-slate-900">
              <td colSpan={4} className="py-2.5 px-3 text-left">
                TOTAL ({challanRecords.length} Challans)
              </td>
              <td className="py-2.5 px-3 text-right tabular-nums">
                {formatINR(challanRecords.reduce((s, r) => s + r.grossAmount, 0))}
              </td>
              <td className="py-2.5 px-3 text-right tabular-nums text-emerald-700">
                {formatINR(challanRecords.reduce((s, r) => s + r.baseTds, 0))}
              </td>
              <td className="py-2.5 px-3 text-right tabular-nums">
                {formatINR(challanRecords.reduce((s, r) => s + r.lateFee234E, 0))}
              </td>
              <td className="py-2.5 px-3 text-right tabular-nums">
                {formatINR(challanRecords.reduce((s, r) => s + r.interest201, 0))}
              </td>
              <td className="py-2.5 px-3 text-right tabular-nums text-slate-950">
                {formatINR(challanRecords.reduce((s, r) => s + r.totalChallanAmount, 0))}
              </td>
              <td className="py-2.5 px-3 text-right tabular-nums">
                {formatINR(challanRecords.reduce((s, r) => s + r.netPayableToSeller, 0))}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile Card Stack */}
      <div className="md:hidden space-y-3">
        {challanRecords.map((r) => (
          <div
            key={r.id}
            className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-900">
                Challan #{r.challanNumber} · {r.pairSharePercentage.toFixed(1)}% Share
              </span>
              <button
                type="button"
                onClick={() => copyPortalFieldValues(r)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-white border border-emerald-300 px-2 py-0.5 rounded cursor-pointer"
              >
                {copiedId === `portal_${r.id}` ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy 26QB Data
                  </>
                )}
              </button>
            </div>

            <div className="text-xs space-y-1">
              <div>
                <span className="text-slate-500">Buyer: </span>
                <span className="font-semibold text-slate-800">{r.buyerName}</span> ({r.buyerShare}%)
              </div>
              <div>
                <span className="text-slate-500">Seller: </span>
                <span className="font-semibold text-slate-800">{r.sellerName}</span> ({r.sellerShare}%)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-xs">
              <div>
                <div className="text-[11px] text-slate-500">Gross Tranche</div>
                <div className="font-semibold text-slate-800 tabular-nums">{formatINR(r.grossAmount)}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500">Base TDS (1%)</div>
                <div className="font-bold text-emerald-700 tabular-nums">{formatINR(r.baseTds)}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500">Late Charges (234E+201)</div>
                <div className="font-semibold text-slate-800 tabular-nums">
                  {formatINR(r.lateFee234E + r.interest201)}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold">Total Challan Amount</div>
                <div className="font-bold text-slate-950 tabular-nums">{formatINR(r.totalChallanAmount)}</div>
              </div>
            </div>

            <div className="pt-1 text-xs text-slate-600 flex items-center justify-between border-t border-slate-200/80">
              <span>Net to Seller:</span>
              <span className="font-bold text-slate-900 tabular-nums">{formatINR(r.netPayableToSeller)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
