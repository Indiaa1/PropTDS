import React from 'react';
import { PenaltyBreakdown } from '../../types/proptds';
import { formatDateDisplay, formatINR } from '../../lib/formatters';
import { Calendar, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DateSelectorProps {
  paymentDate: string;
  depositDate: string;
  penalty: PenaltyBreakdown;
  onChangePaymentDate: (d: string) => void;
  onChangeDepositDate: (d: string) => void;
  onSetTodayDeposit: () => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  paymentDate,
  depositDate,
  penalty,
  onChangePaymentDate,
  onChangeDepositDate,
  onSetTodayDeposit,
}) => {
  const isInvalidDateSequence = paymentDate && depositDate && depositDate < paymentDate;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>3. Payment & Deposit Compliance Timeline</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Section 194-IA mandates deposit within 30 days from the end of the month in which deduction is made.
          </p>
        </div>

        <button
          type="button"
          onClick={onSetTodayDeposit}
          className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors self-start sm:self-auto cursor-pointer"
        >
          Set Deposit Date = Today
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Payment Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Date of Payment / Credit to Seller
          </label>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => onChangePaymentDate(e.target.value)}
            className="w-full px-3 py-2 text-base sm:text-xs font-semibold text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white min-h-[44px]"
          />
          <p className="text-[11px] text-slate-500">
            Selected: <span className="font-medium text-slate-700">{formatDateDisplay(paymentDate)}</span>
          </p>
        </div>

        {/* Deposit Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Actual / Target Date of TDS Deposit
          </label>
          <input
            type="date"
            value={depositDate}
            onChange={(e) => onChangeDepositDate(e.target.value)}
            className="w-full px-3 py-2 text-base sm:text-xs font-semibold text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white min-h-[44px]"
          />
          <p className="text-[11px] text-slate-500">
            Selected: <span className="font-medium text-slate-700">{formatDateDisplay(depositDate)}</span>
          </p>
        </div>

        {/* Calculated Statutory Due Date */}
        <div className="space-y-1.5 rounded-lg bg-slate-50 p-3 border border-slate-200">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
            Statutory Due Date
          </div>
          <div className="text-sm font-bold text-slate-900 tabular-nums">
            {penalty.formattedDueDate || 'Enter Payment Date'}
          </div>
          <div className="text-[11px] text-slate-500">
            End of deduction month + 30 calendar days
          </div>
        </div>
      </div>

      {/* Date Ordering Validation */}
      {isInvalidDateSequence && (
        <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
          <div className="text-xs text-rose-900">
            <strong>Invalid Date Combination:</strong> The deposit date cannot be earlier than the payment/credit date.
          </div>
        </div>
      )}

      {/* Compliance / Delay Status Box */}
      {!isInvalidDateSequence && penalty.formattedDueDate && (
        <div
          className={`rounded-lg p-3.5 border ${
            penalty.isOverdue
              ? 'bg-amber-50/70 border-amber-200 text-amber-950'
              : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
          }`}
        >
          <div className="flex items-start gap-3">
            {penalty.isOverdue ? (
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            )}
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold">
                  {penalty.isOverdue
                    ? `Deposit is OVERDUE by ${penalty.delayDays} day(s)`
                    : 'Compliant Timeline — On-Time Filing'}
                </span>
                {penalty.isLateFeeCapped && (
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    Section 234E Fee Capped at 100% of TDS
                  </span>
                )}
              </div>

              {penalty.isOverdue ? (
                <div className="text-xs text-amber-900 leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    • <strong>Sec 234E Late Fee:</strong> {formatINR(penalty.payableLateFee234E)}{' '}
                    ({penalty.delayDays} days × ₹200/day
                    {penalty.isLateFeeCapped ? ' — capped at total TDS' : ''})
                  </div>
                  <div>
                    • <strong>Sec 201(1A) Interest:</strong> {formatINR(penalty.payableInterest201)}{' '}
                    (1.5% per month for {penalty.interestMonths201} month(s))
                  </div>
                </div>
              ) : (
                <p className="text-xs text-emerald-800">
                  TDS deposited on or before statutory due date ({penalty.formattedDueDate}). No late filing fee under Section 234E or interest under Section 201(1A) is payable.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
