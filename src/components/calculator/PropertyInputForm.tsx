import React from 'react';
import { formatINR, formatWordsIndian } from '../../lib/formatters';
import { TDS_THRESHOLD } from '../../lib/calculations/splitEngine';
import { AlertTriangle, CheckCircle2, Info, Sparkles, RotateCcw } from 'lucide-react';

interface PropertyInputFormProps {
  agreementValue: number;
  circleRateValue: number;
  installmentAmount: number;
  isPartialTranche: boolean;
  onChangeAgreementValue: (val: number) => void;
  onChangeCircleRateValue: (val: number) => void;
  onChangeInstallmentAmount: (val: number) => void;
  onTogglePartialTranche: (active: boolean) => void;
  onApplyPreset: (agreeVal: number, circleVal: number) => void;
  onClearForm?: () => void;
}

export const PropertyInputForm: React.FC<PropertyInputFormProps> = ({
  agreementValue,
  circleRateValue,
  installmentAmount,
  isPartialTranche,
  onChangeAgreementValue,
  onChangeCircleRateValue,
  onChangeInstallmentAmount,
  onTogglePartialTranche,
  onApplyPreset,
  onClearForm,
}) => {
  const maxValuation = Math.max(agreementValue, circleRateValue);
  const isCircleRateHigher = circleRateValue > agreementValue;
  const isBelowThreshold = maxValuation < TDS_THRESHOLD;

  const presets = [
    { label: '₹55 Lakh (Threshold Test)', agree: 5500000, circle: 5000000 },
    { label: '₹75 Lakh (Tier-2 City 3BHK)', agree: 7500000, circle: 7500000 },
    { label: '₹1.20 Cr (Circle Rate High)', agree: 10000000, circle: 12000000 },
    { label: '₹2.50 Cr (Metro Luxury)', agree: 25000000, circle: 22000000 },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>1. Property Financials & Valuation</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter the deed agreement value and circle rate (stamp duty valuation).
          </p>
        </div>

        {/* Quick Presets & Clear Form */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 sm:pt-0">
          <span className="text-[11px] font-medium text-slate-400">Presets:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onApplyPreset(p.agree, p.circle)}
              className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 px-2 py-1 rounded transition-colors cursor-pointer"
            >
              {p.label.split(' ')[0]}
            </button>
          ))}
          {onClearForm && (
            <button
              type="button"
              onClick={onClearForm}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-1 rounded transition-colors cursor-pointer ml-1"
              title="Reset inputs to empty zero state"
            >
              <RotateCcw className="w-3 h-3" />
              Reset / Clear Form
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Agreement Value */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">
              Total Agreement Consideration Value (₹)
            </label>
            <span className="text-xs font-medium text-emerald-700 tabular-nums">
              {formatWordsIndian(agreementValue)}
            </span>
          </div>
          <div className="relative rounded-lg shadow-2xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-semibold text-sm">
              ₹
            </div>
            <input
              type="number"
              min="0"
              step="50000"
              value={agreementValue || ''}
              onChange={(e) => onChangeAgreementValue(Math.max(0, Number(e.target.value)))}
              placeholder="e.g. 7500000"
              className="w-full pl-8 pr-3 py-2.5 text-base sm:text-sm font-semibold text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 tabular-nums min-h-[44px]"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Contractual purchase price specified in the agreement to sell / sale deed.
          </p>
        </div>

        {/* Circle Rate / Stamp Duty Value */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">
              Stamp Duty Value / Circle Rate Valuation (₹)
            </label>
            <span className="text-xs font-medium text-emerald-700 tabular-nums">
              {formatWordsIndian(circleRateValue)}
            </span>
          </div>
          <div className="relative rounded-lg shadow-2xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-semibold text-sm">
              ₹
            </div>
            <input
              type="number"
              min="0"
              step="50000"
              value={circleRateValue || ''}
              onChange={(e) => onChangeCircleRateValue(Math.max(0, Number(e.target.value)))}
              placeholder="e.g. 7500000"
              className="w-full pl-8 pr-3 py-2.5 text-base sm:text-sm font-semibold text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 tabular-nums min-h-[44px]"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Valuation adopted by State Registrar for stamp duty assessment (Section 50C).
          </p>
        </div>
      </div>

      {/* Statutory Higher Value Notice */}
      {isCircleRateHigher && maxValuation >= TDS_THRESHOLD && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-semibold">Section 50C / 194-IA Rule: </strong>
            Stamp Duty Value ({formatINR(circleRateValue)}) exceeds Agreement Consideration ({formatINR(agreementValue)}). Under the Finance Act statutory rule, TDS must be deducted on the higher Stamp Duty Valuation ({formatINR(circleRateValue)}) to avoid demand notice under Section 143(1).
          </div>
        </div>
      )}

      {/* Threshold Exemption Notice (< 50L) */}
      {isBelowThreshold && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3.5 flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <div className="text-xs text-emerald-900 leading-relaxed">
            <strong className="font-semibold">Statutory Exemption: </strong>
            Total property valuation ({formatINR(maxValuation)}) is under the statutory ₹50,00,000 threshold. Section 194-IA TDS is not applicable (TDS = ₹0). No Form 26QB filing is required.
          </div>
        </div>
      )}

      {/* Partial Tranche / Installment Toggle */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onTogglePartialTranche(!isPartialTranche)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isPartialTranche ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isPartialTranche ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-xs font-semibold text-slate-800 cursor-pointer" onClick={() => onTogglePartialTranche(!isPartialTranche)}>
              Deduct TDS on Partial Installment / Stage Tranche
            </span>
          </div>

          <span className="text-[11px] text-slate-500">
            {isPartialTranche ? 'Calculating on custom installment' : 'Calculating on full property consideration'}
          </span>
        </div>

        {isPartialTranche && (
          <div className="mt-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Current Payment Tranche / Installment Paid (₹)
              </label>
              <span className="text-xs font-medium text-emerald-700 tabular-nums">
                {formatINR(installmentAmount)} ({formatWordsIndian(installmentAmount)})
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-semibold text-sm">
                ₹
              </div>
              <input
                type="number"
                min="0"
                max={agreementValue}
                step="25000"
                value={installmentAmount || ''}
                onChange={(e) => onChangeInstallmentAmount(Math.max(0, Number(e.target.value)))}
                placeholder="e.g. 2000000"
                className="w-full pl-8 pr-3 py-2.5 text-base sm:text-sm font-semibold text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white tabular-nums min-h-[44px]"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              TDS is deducted proportionately whenever an installment or advance payment is released to the seller.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
