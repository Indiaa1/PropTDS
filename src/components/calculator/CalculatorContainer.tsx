import React, { useState, useEffect, useRef } from 'react';
import { CalculationInput, Party, SplitCalculationResult } from '../../types/proptds';
import { calculatePropTds } from '../../lib/calculations/splitEngine';
import { PropertyInputForm } from './PropertyInputForm';
import { PartyShareSelector } from './PartyShareSelector';
import { DateSelector } from './DateSelector';
import { ResultsSummaryCard } from './ResultsSummaryCard';
import { ChallanMatrixTable } from './ChallanMatrixTable';
import { FaqAccordion } from '../common/FaqAccordion';
import { RotateCcw, Share2, Sparkles, Check } from 'lucide-react';

const STORAGE_KEY = 'proptds_state_v1';

const getInitialDateStr = (daysOffset = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

const defaultInput: CalculationInput = {
  agreementValue: 6000000,
  circleRateValue: 6000000,
  installmentAmount: 6000000,
  paymentDate: getInitialDateStr(-10),
  depositDate: getInitialDateStr(0),
  buyers: [{ id: 'b1', name: 'Buyer 1', sharePercentage: 100 }],
  sellers: [{ id: 's1', name: 'Seller 1', sharePercentage: 100 }],
};

interface CalculatorContainerProps {
  onOpenPdfModal: () => void;
}

export const CalculatorContainer: React.FC<CalculatorContainerProps> = ({ onOpenPdfModal }) => {
  const [input, setInput] = useState<CalculationInput>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.agreementValue === 'number' && parsed.buyers?.length) {
          // If stored value was previous 75L default, upgrade to 60L baseline
          if (parsed.agreementValue === 7500000 && parsed.circleRateValue === 7500000 && parsed.buyers.length === 1 && parsed.sellers.length === 1) {
            return defaultInput;
          }
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return defaultInput;
  });

  const [isPartialTranche, setIsPartialTranche] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const matrixRef = useRef<HTMLDivElement>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
    } catch {
      // ignore
    }
  }, [input]);

  // Reactive calculation
  const result: SplitCalculationResult = calculatePropTds(input);

  // Handlers for Property Values
  const handleAgreementValueChange = (val: number) => {
    setInput((prev) => ({
      ...prev,
      agreementValue: val,
      installmentAmount: isPartialTranche ? prev.installmentAmount : val,
    }));
  };

  const handleCircleRateValueChange = (val: number) => {
    setInput((prev) => ({
      ...prev,
      circleRateValue: val,
    }));
  };

  const handleInstallmentAmountChange = (val: number) => {
    setInput((prev) => ({
      ...prev,
      installmentAmount: val,
    }));
  };

  const handleTogglePartialTranche = (active: boolean) => {
    setIsPartialTranche(active);
    if (!active) {
      setInput((prev) => ({
        ...prev,
        installmentAmount: prev.agreementValue,
      }));
    }
  };

  const handleApplyPreset = (agreeVal: number, circleVal: number) => {
    setInput((prev) => ({
      ...prev,
      agreementValue: agreeVal,
      circleRateValue: circleVal,
      installmentAmount: agreeVal,
    }));
    setIsPartialTranche(false);
  };

  // Handlers for Parties
  const handleUpdateBuyer = (index: number, updated: Partial<Party>) => {
    setInput((prev) => {
      const nextBuyers = [...prev.buyers];
      nextBuyers[index] = { ...nextBuyers[index], ...updated };
      return { ...prev, buyers: nextBuyers };
    });
  };

  const handleAddBuyer = () => {
    if (input.buyers.length >= 4) return;
    setInput((prev) => {
      const count = prev.buyers.length + 1;
      const newBuyer: Party = {
        id: `b${Date.now()}_${count}`,
        name: `Buyer ${count}`,
        sharePercentage: 0,
      };
      // Distribute equal shares
      const equalShare = parseFloat((100 / count).toFixed(2));
      const next = [...prev.buyers, newBuyer].map((b, i, arr) => ({
        ...b,
        sharePercentage: i === arr.length - 1 ? parseFloat((100 - equalShare * (count - 1)).toFixed(2)) : equalShare,
      }));
      return { ...prev, buyers: next };
    });
  };

  const handleRemoveBuyer = (index: number) => {
    if (input.buyers.length <= 1) return;
    setInput((prev) => {
      const next = prev.buyers.filter((_, i) => i !== index);
      const equalShare = parseFloat((100 / next.length).toFixed(2));
      return {
        ...prev,
        buyers: next.map((b, i, arr) => ({
          ...b,
          sharePercentage: i === arr.length - 1 ? parseFloat((100 - equalShare * (arr.length - 1)).toFixed(2)) : equalShare,
        })),
      };
    });
  };

  const handleUpdateSeller = (index: number, updated: Partial<Party>) => {
    setInput((prev) => {
      const nextSellers = [...prev.sellers];
      nextSellers[index] = { ...nextSellers[index], ...updated };
      return { ...prev, sellers: nextSellers };
    });
  };

  const handleAddSeller = () => {
    if (input.sellers.length >= 4) return;
    setInput((prev) => {
      const count = prev.sellers.length + 1;
      const newSeller: Party = {
        id: `s${Date.now()}_${count}`,
        name: `Seller ${count}`,
        sharePercentage: 0,
      };
      const equalShare = parseFloat((100 / count).toFixed(2));
      const next = [...prev.sellers, newSeller].map((s, i, arr) => ({
        ...s,
        sharePercentage: i === arr.length - 1 ? parseFloat((100 - equalShare * (count - 1)).toFixed(2)) : equalShare,
      }));
      return { ...prev, sellers: next };
    });
  };

  const handleRemoveSeller = (index: number) => {
    if (input.sellers.length <= 1) return;
    setInput((prev) => {
      const next = prev.sellers.filter((_, i) => i !== index);
      const equalShare = parseFloat((100 / next.length).toFixed(2));
      return {
        ...prev,
        sellers: next.map((s, i, arr) => ({
          ...s,
          sharePercentage: i === arr.length - 1 ? parseFloat((100 - equalShare * (arr.length - 1)).toFixed(2)) : equalShare,
        })),
      };
    });
  };

  const handleSetEqualSplit = (type: 'buyers' | 'sellers') => {
    setInput((prev) => {
      const list = type === 'buyers' ? prev.buyers : prev.sellers;
      const count = list.length;
      const equal = parseFloat((100 / count).toFixed(2));
      const updated = list.map((item, i, arr) => ({
        ...item,
        sharePercentage: i === arr.length - 1 ? parseFloat((100 - equal * (count - 1)).toFixed(2)) : equal,
      }));
      return type === 'buyers' ? { ...prev, buyers: updated } : { ...prev, sellers: updated };
    });
  };

  const handleSetSplitRatio = (type: 'buyers' | 'sellers', shares: number[]) => {
    setInput((prev) => {
      const list = type === 'buyers' ? prev.buyers : prev.sellers;
      const updated = list.map((item, i) => ({
        ...item,
        sharePercentage: shares[i] ?? 0,
      }));
      return type === 'buyers' ? { ...prev, buyers: updated } : { ...prev, sellers: updated };
    });
  };

  // Preset Scenario Loaders
  const loadScenario2x2 = () => {
    setInput({
      agreementValue: 12000000,
      circleRateValue: 12000000,
      installmentAmount: 12000000,
      paymentDate: getInitialDateStr(-15),
      depositDate: getInitialDateStr(0),
      buyers: [
        { id: 'b1', name: 'Buyer 1 (Husband)', sharePercentage: 50 },
        { id: 'b2', name: 'Buyer 2 (Wife)', sharePercentage: 50 },
      ],
      sellers: [
        { id: 's1', name: 'Seller 1 (Co-owner A)', sharePercentage: 50 },
        { id: 's2', name: 'Seller 2 (Co-owner B)', sharePercentage: 50 },
      ],
    });
    setIsPartialTranche(false);
  };

  const loadScenarioCircleRateHigh = () => {
    // Acceptance Criteria AC-01 scenario: Agreement 60L, Circle Rate 75L
    setInput({
      agreementValue: 6000000,
      circleRateValue: 7500000,
      installmentAmount: 6000000,
      paymentDate: getInitialDateStr(-10),
      depositDate: getInitialDateStr(0),
      buyers: [{ id: 'b1', name: 'Buyer 1', sharePercentage: 100 }],
      sellers: [{ id: 's1', name: 'Seller 1', sharePercentage: 100 }],
    });
    setIsPartialTranche(false);
  };

  const loadScenarioLateFeeDelay = () => {
    // Acceptance Criteria AC-04 scenario: Payment 15/01/2026, Deposit 10/03/2026
    setInput({
      agreementValue: 5000000,
      circleRateValue: 5000000,
      installmentAmount: 5000000,
      paymentDate: '2026-01-15',
      depositDate: '2026-03-10',
      buyers: [{ id: 'b1', name: 'Buyer 1', sharePercentage: 100 }],
      sellers: [{ id: 's1', name: 'Seller 1', sharePercentage: 100 }],
    });
    setIsPartialTranche(false);
  };

  const handleClearForm = () => {
    const emptyState: CalculationInput = {
      agreementValue: 0,
      circleRateValue: 0,
      installmentAmount: 0,
      paymentDate: getInitialDateStr(-10),
      depositDate: getInitialDateStr(0),
      buyers: [{ id: 'b1', name: 'Buyer 1', sharePercentage: 100 }],
      sellers: [{ id: 's1', name: 'Seller 1', sharePercentage: 100 }],
    };
    setInput(emptyState);
    setIsPartialTranche(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyState));
    } catch {
      // ignore
    }
  };

  const handleResetToBaseline = () => {
    setInput(defaultInput);
    setIsPartialTranche(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInput));
    } catch {
      // ignore
    }
  };

  const handleScrollToMatrix = () => {
    matrixRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Scenarios Strip */}
      <div className="bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-800 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Instant Scenarios
            </span>
            <span className="text-xs text-slate-400">· One-click configuration</span>
          </div>
          <div className="text-sm font-bold text-slate-100">
            Select standard transaction template or customize below:
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={loadScenario2x2}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            2 Buyers × 2 Sellers (50:50)
          </button>
          <button
            onClick={loadScenarioCircleRateHigh}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            Circle Rate &gt; Agreement Value
          </button>
          <button
            onClick={loadScenarioLateFeeDelay}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-900/50 transition-colors cursor-pointer"
          >
            Delayed Filing (Sec 234E & 201)
          </button>
          <button
            onClick={handleClearForm}
            title="Clear all fields to zero"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/80 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset / Clear Form
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs (Steps 1, 2, 3) */}
        <div className="lg:col-span-7 space-y-6">
          <PropertyInputForm
            agreementValue={input.agreementValue}
            circleRateValue={input.circleRateValue}
            installmentAmount={input.installmentAmount}
            isPartialTranche={isPartialTranche}
            onChangeAgreementValue={handleAgreementValueChange}
            onChangeCircleRateValue={handleCircleRateValueChange}
            onChangeInstallmentAmount={handleInstallmentAmountChange}
            onTogglePartialTranche={handleTogglePartialTranche}
            onApplyPreset={handleApplyPreset}
            onClearForm={handleClearForm}
          />

          <PartyShareSelector
            buyers={input.buyers}
            sellers={input.sellers}
            grossTrancheAmount={result.totalGrossTranche}
            onUpdateBuyer={handleUpdateBuyer}
            onAddBuyer={handleAddBuyer}
            onRemoveBuyer={handleRemoveBuyer}
            onUpdateSeller={handleUpdateSeller}
            onAddSeller={handleAddSeller}
            onRemoveSeller={handleRemoveSeller}
            onSetEqualSplit={handleSetEqualSplit}
            onSetSplitRatio={handleSetSplitRatio}
          />

          <DateSelector
            paymentDate={input.paymentDate}
            depositDate={input.depositDate}
            penalty={result.penalty}
            onChangePaymentDate={(d) => setInput((p) => ({ ...p, paymentDate: d }))}
            onChangeDepositDate={(d) => setInput((p) => ({ ...p, depositDate: d }))}
            onSetTodayDeposit={() => setInput((p) => ({ ...p, depositDate: getInitialDateStr(0) }))}
          />
        </div>

        {/* Right Column: Live Results Summary (Sticky on Desktop) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          <ResultsSummaryCard
            result={result}
            onScrollToMatrix={handleScrollToMatrix}
          />

          {/* Quick Filing Quick Tips Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 text-xs text-slate-600 shadow-xs">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Statutory 194-IA Rule Checklist
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>₹50 Lakh Rule:</strong> Evaluated on total property valuation ({input.agreementValue >= 5000000 || input.circleRateValue >= 5000000 ? 'Compliant' : 'Below Threshold'}).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Multi-PAN Rule:</strong> Total of <strong>{result.challanRecords.length} unique Form 26QB</strong> filings required.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Due Date:</strong> Must be deposited by <strong>{result.penalty.formattedDueDate || 'due date'}</strong> to prevent daily late fees.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>TRACES Form 16B:</strong> Issue TDS certificate to each seller within 15 days of Form 26QB processing.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full Width Matrix Table & Actions */}
      <div ref={matrixRef} className="pt-2">
        <ChallanMatrixTable
          input={input}
          result={result}
          onOpenPdfModal={onOpenPdfModal}
        />
      </div>

      {/* Structured FAQ Section */}
      <div className="pt-4">
        <FaqAccordion />
      </div>
    </div>
  );
};
