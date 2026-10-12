import React from 'react';
import { Party } from '../../types/proptds';
import { formatINR } from '../../lib/formatters';
import { Plus, Trash2, Users, AlertCircle, CheckCircle } from 'lucide-react';

interface PartyShareSelectorProps {
  buyers: Party[];
  sellers: Party[];
  grossTrancheAmount: number;
  onUpdateBuyer: (index: number, updated: Partial<Party>) => void;
  onAddBuyer: () => void;
  onRemoveBuyer: (index: number) => void;
  onUpdateSeller: (index: number, updated: Partial<Party>) => void;
  onAddSeller: () => void;
  onRemoveSeller: (index: number) => void;
  onSetEqualSplit: (type: 'buyers' | 'sellers') => void;
  onSetSplitRatio: (type: 'buyers' | 'sellers', shares: number[]) => void;
}

export const PartyShareSelector: React.FC<PartyShareSelectorProps> = ({
  buyers,
  sellers,
  grossTrancheAmount,
  onUpdateBuyer,
  onAddBuyer,
  onRemoveBuyer,
  onUpdateSeller,
  onAddSeller,
  onRemoveSeller,
  onSetEqualSplit,
  onSetSplitRatio,
}) => {
  const buyerSum = buyers.reduce((acc, b) => acc + (Number(b.sharePercentage) || 0), 0);
  const sellerSum = sellers.reduce((acc, s) => acc + (Number(s.sharePercentage) || 0), 0);

  const isBuyerSumValid = Math.abs(buyerSum - 100) <= 0.05;
  const isSellerSumValid = Math.abs(sellerSum - 100) <= 0.05;

  const totalPairs = buyers.length * sellers.length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>2. Parties & Co-Ownership Split Matrix</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure buyers and sellers (1–4 each). Each unique pair requires a separate Form 26QB filing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {totalPairs} Challan{totalPairs > 1 ? 's' : ''} ({buyers.length}B × {sellers.length}S)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BUYERS SECTION */}
        <div className="space-y-4 rounded-lg bg-slate-50/70 p-4 border border-slate-200/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Buyers (Transferees)
              </span>
              <span className="text-xs text-slate-500 font-mono">({buyers.length}/4)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onSetEqualSplit('buyers')}
                className="text-[11px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded transition-colors cursor-pointer"
                title="Split equally across buyers"
              >
                Equal Split
              </button>
              {buyers.length === 2 && (
                <button
                  type="button"
                  onClick={() => onSetSplitRatio('buyers', [60, 40])}
                  className="text-[11px] font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 px-2 py-0.5 rounded cursor-pointer"
                >
                  60:40
                </button>
              )}
              {buyers.length < 4 && (
                <button
                  type="button"
                  onClick={onAddBuyer}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  Add Buyer
                </button>
              )}
            </div>
          </div>

          {/* Buyer Rows */}
          <div className="space-y-2.5">
            {buyers.map((buyer, idx) => {
              const buyerFraction = (Number(buyer.sharePercentage) || 0) / 100;
              const approxAmount = Math.round(grossTrancheAmount * buyerFraction);
              return (
                <div
                  key={buyer.id}
                  className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={buyer.name}
                      onChange={(e) => onUpdateBuyer(idx, { name: e.target.value })}
                      placeholder={`Buyer ${idx + 1}`}
                      className="flex-1 text-base sm:text-xs font-semibold text-slate-800 px-2.5 py-2 sm:py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none min-h-[40px] sm:min-h-0"
                    />

                    <div className="relative w-24 sm:w-28">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        step="0.5"
                        value={buyer.sharePercentage}
                        onChange={(e) =>
                          onUpdateBuyer(idx, { sharePercentage: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full text-base sm:text-xs font-semibold text-right pr-6 pl-2 py-2 sm:py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none tabular-nums min-h-[40px] sm:min-h-0"
                      />
                      <span className="absolute inset-y-0 right-2 flex items-center text-xs font-medium text-slate-400 pointer-events-none">
                        %
                      </span>
                    </div>

                    {buyers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onRemoveBuyer(idx)}
                        className="p-2 sm:p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                        title="Remove buyer"
                      >
                        <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-0.5">
                    <span>Effective Share:</span>
                    <span className="font-medium text-slate-700 tabular-nums">
                      {formatINR(approxAmount)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Buyer Validation Status */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-600 font-medium">Total Buyer Share:</span>
            <div className="flex items-center gap-1.5">
              <span
                className={`font-mono font-bold ${
                  isBuyerSumValid ? 'text-emerald-700' : 'text-amber-600'
                }`}
              >
                {buyerSum.toFixed(2)}%
              </span>
              {isBuyerSumValid ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600" />
              )}
            </div>
          </div>
          {!isBuyerSumValid && (
            <p className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded border border-amber-200">
              Buyer shares must sum to exactly 100.00% (currently discrepancy of{' '}
              {Math.abs(100 - buyerSum).toFixed(2)}%).
            </p>
          )}
        </div>

        {/* SELLERS SECTION */}
        <div className="space-y-4 rounded-lg bg-slate-50/70 p-4 border border-slate-200/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Sellers (Transferors)
              </span>
              <span className="text-xs text-slate-500 font-mono">({sellers.length}/4)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onSetEqualSplit('sellers')}
                className="text-[11px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded transition-colors cursor-pointer"
                title="Split equally across sellers"
              >
                Equal Split
              </button>
              {sellers.length === 2 && (
                <button
                  type="button"
                  onClick={() => onSetSplitRatio('sellers', [50, 50])}
                  className="text-[11px] font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 px-2 py-0.5 rounded cursor-pointer"
                >
                  50:50
                </button>
              )}
              {sellers.length < 4 && (
                <button
                  type="button"
                  onClick={onAddSeller}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  Add Seller
                </button>
              )}
            </div>
          </div>

          {/* Seller Rows */}
          <div className="space-y-2.5">
            {sellers.map((seller, idx) => {
              const sellerFraction = (Number(seller.sharePercentage) || 0) / 100;
              const approxAmount = Math.round(grossTrancheAmount * sellerFraction);
              return (
                <div
                  key={seller.id}
                  className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={seller.name}
                      onChange={(e) => onUpdateSeller(idx, { name: e.target.value })}
                      placeholder={`Seller ${idx + 1}`}
                      className="flex-1 text-base sm:text-xs font-semibold text-slate-800 px-2.5 py-2 sm:py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none min-h-[40px] sm:min-h-0"
                    />

                    <div className="relative w-24 sm:w-28">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        step="0.5"
                        value={seller.sharePercentage}
                        onChange={(e) =>
                          onUpdateSeller(idx, { sharePercentage: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full text-base sm:text-xs font-semibold text-right pr-6 pl-2 py-2 sm:py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none tabular-nums min-h-[40px] sm:min-h-0"
                      />
                      <span className="absolute inset-y-0 right-2 flex items-center text-xs font-medium text-slate-400 pointer-events-none">
                        %
                      </span>
                    </div>

                    {sellers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onRemoveSeller(idx)}
                        className="p-2 sm:p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                        title="Remove seller"
                      >
                        <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-0.5">
                    <span>Effective Share:</span>
                    <span className="font-medium text-slate-700 tabular-nums">
                      {formatINR(approxAmount)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Seller Validation Status */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-600 font-medium">Total Seller Share:</span>
            <div className="flex items-center gap-1.5">
              <span
                className={`font-mono font-bold ${
                  isSellerSumValid ? 'text-emerald-700' : 'text-amber-600'
                }`}
              >
                {sellerSum.toFixed(2)}%
              </span>
              {isSellerSumValid ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600" />
              )}
            </div>
          </div>
          {!isSellerSumValid && (
            <p className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded border border-amber-200">
              Seller shares must sum to exactly 100.00% (currently discrepancy of{' '}
              {Math.abs(100 - sellerSum).toFixed(2)}%).
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
