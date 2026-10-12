import React from 'react';
import { SplitCalculationResult } from '../../types/proptds';
import { formatINR, formatWordsIndian } from '../../lib/formatters';
import { Receipt, AlertCircle, ArrowUpRight, Scale, Check } from 'lucide-react';

interface ResultsSummaryCardProps {
  result: SplitCalculationResult;
  onScrollToMatrix?: () => void;
}

export const ResultsSummaryCard: React.FC<ResultsSummaryCardProps> = ({
  result,
  onScrollToMatrix,
}) => {
  const {
    isApplicable,
    totalBaseTds,
    totalPropertyBase,
    totalGrossTranche,
    totalNetToSellers,
    challanRecords,
    penalty,
    valuationBasis,
    isCircleRateHigher,
  } = result;

  const totalLateFee = penalty.payableLateFee234E || 0;
  const totalInterest = penalty.payableInterest201 || 0;
  const totalChallanPayable = totalBaseTds + totalLateFee + totalInterest;

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 text-white p-5 sm:p-6 shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Statutory Calculation Summary
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Form 26QB Tax & Challan Payable
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {isApplicable ? (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/80">
              {challanRecords.length} Challan{challanRecords.length > 1 ? 's' : ''} to File
            </span>
          ) : (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              Exempt (&lt; ₹50L)
            </span>
          )}
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Base TDS (1%) */}
        <div className="bg-slate-800/70 rounded-lg p-3.5 border border-slate-700/60 space-y-1">
          <div className="text-[11px] font-medium text-slate-400">
            Base TDS (1% Rate)
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">
            {formatINR(totalBaseTds)}
          </div>
          <div className="text-[11px] text-slate-400">
            {isApplicable ? `On ${formatINR(result.currentTrancheTaxableBase)} base` : 'Exempt from Section 194-IA'}
          </div>
        </div>

        {/* KPI 2: Net Payable to Seller */}
        <div className="bg-slate-800/70 rounded-lg p-3.5 border border-slate-700/60 space-y-1">
          <div className="text-[11px] font-medium text-slate-400">
            Net to Seller(s)
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
            {formatINR(totalNetToSellers)}
          </div>
          <div className="text-[11px] text-slate-400">
            Gross ({formatINR(totalGrossTranche)}) minus TDS
          </div>
        </div>

        {/* KPI 3: Late Fees & Interest */}
        <div className="bg-slate-800/70 rounded-lg p-3.5 border border-slate-700/60 space-y-1">
          <div className="text-[11px] font-medium text-slate-400">
            Late Charges (234E + 201)
          </div>
          <div
            className={`text-xl sm:text-2xl font-bold tabular-nums ${
              penalty.totalLateCharges > 0 ? 'text-amber-400' : 'text-slate-300'
            }`}
          >
            {formatINR(penalty.totalLateCharges)}
          </div>
          <div className="text-[11px] text-slate-400">
            {penalty.totalLateCharges > 0
              ? `Fee: ${formatINR(totalLateFee)} + Int: ${formatINR(totalInterest)}`
              : 'Zero (On-time deposit)'}
          </div>
        </div>

        {/* KPI 4: Total Challan Deposit Amount */}
        <div className="bg-emerald-950/60 rounded-lg p-3.5 border border-emerald-800/70 space-y-1">
          <div className="text-[11px] font-medium text-emerald-300">
            Total Challan Amount
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-300 tabular-nums">
            {formatINR(totalChallanPayable)}
          </div>
          <div className="text-[11px] text-emerald-400">
            Base TDS + Statutory Penalties
          </div>
        </div>
      </div>

      {/* Tax Valuation Basis Strip */}
      <div className="bg-slate-800/50 rounded-lg p-3 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-700/50">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Statutory Base: </strong>
            {isCircleRateHigher ? (
              <span className="text-amber-300">
                Stamp Duty Value ({formatINR(totalPropertyBase)}) adopted (Higher than Agreement Value per Sec 50C)
              </span>
            ) : (
              <span>
                Agreement Value ({formatINR(totalPropertyBase)}) adopted as tax base
              </span>
            )}
          </span>
        </div>

        {onScrollToMatrix && isApplicable && (
          <button
            type="button"
            onClick={onScrollToMatrix}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer shrink-0"
          >
            View Pair Breakdown
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
