import { CalculationInput, ChallanSplitRecord, SplitCalculationResult } from '../../types/proptds';
import { calculatePenalty } from './penaltyEngine';

export const TDS_THRESHOLD = 5000000; // ₹50,00,000 (50 Lakhs)
export const TDS_RATE = 0.01; // 1%

/**
 * Calculates Section 194-IA (Form 26QB) split matrix for multi-party property purchase.
 */
export function calculatePropTds(input: CalculationInput): SplitCalculationResult {
  const {
    agreementValue = 0,
    circleRateValue = 0,
    installmentAmount = 0,
    paymentDate,
    depositDate,
    buyers = [],
    sellers = [],
  } = input;

  // Calculate sum of shares
  const buyerShareSum = buyers.reduce((sum, b) => sum + (Number(b.sharePercentage) || 0), 0);
  const sellerShareSum = sellers.reduce((sum, s) => sum + (Number(s.sharePercentage) || 0), 0);

  const isBuyerShareValid = Math.abs(buyerShareSum - 100) <= 0.05;
  const isSellerShareValid = Math.abs(sellerShareSum - 100) <= 0.05;

  let validationError: string | undefined;
  if (!isBuyerShareValid) {
    validationError = `Buyer shares sum to ${buyerShareSum.toFixed(2)}%. Must equal exactly 100.00%.`;
  } else if (!isSellerShareValid) {
    validationError = `Seller shares sum to ${sellerShareSum.toFixed(2)}%. Must equal exactly 100.00%.`;
  }

  // Base property valuation: Higher of Agreement Value vs Stamp Duty Value (Circle Rate)
  const totalPropertyBase = Math.max(agreementValue, circleRateValue);
  const isCircleRateHigher = circleRateValue > agreementValue;
  const valuationBasis: 'AGREEMENT_VALUE' | 'CIRCLE_RATE' = isCircleRateHigher
    ? 'CIRCLE_RATE'
    : 'AGREEMENT_VALUE';

  // Section 194-IA threshold: Property value >= ₹50,00,000
  const isApplicable = totalPropertyBase >= TDS_THRESHOLD;

  // Actual installment tranche gross
  const totalGrossTranche = installmentAmount > 0 ? installmentAmount : agreementValue;

  // Tranche ratio relative to agreement value
  const trancheRatio = agreementValue > 0 ? totalGrossTranche / agreementValue : 1;

  // Taxable base for the current tranche
  const currentTrancheTaxableBase = isApplicable ? totalPropertyBase * trancheRatio : 0;

  // Total base TDS (1%)
  const totalBaseTds = isApplicable ? Math.round(currentTrancheTaxableBase * TDS_RATE) : 0;

  // Calculate statutory penalty / late fee
  const penalty = isApplicable
    ? calculatePenalty(paymentDate, depositDate, totalBaseTds)
    : calculatePenalty('', '', 0);

  // If validation fails or not applicable, generate records or zeroed records
  const challanRecords: ChallanSplitRecord[] = [];

  let runningBaseTdsSum = 0;
  let runningLateFeeSum = 0;
  let runningInterestSum = 0;
  let challanCounter = 1;

  const totalPairs = (buyers.length || 1) * (sellers.length || 1);

  if (buyers.length > 0 && sellers.length > 0) {
    for (let bIdx = 0; bIdx < buyers.length; bIdx++) {
      const buyer = buyers[bIdx];
      const buyerFraction = (Number(buyer.sharePercentage) || 0) / 100;

      for (let sIdx = 0; sIdx < sellers.length; sIdx++) {
        const seller = sellers[sIdx];
        const sellerFraction = (Number(seller.sharePercentage) || 0) / 100;

        const pairFraction = buyerFraction * sellerFraction;
        const pairSharePercentage = pairFraction * 100;

        const grossAmount = Math.round(totalGrossTranche * pairFraction);
        const taxableBase = Math.round(currentTrancheTaxableBase * pairFraction);

        let pairBaseTds = 0;
        let pairLateFee = 0;
        let pairInterest = 0;

        if (isApplicable && isBuyerShareValid && isSellerShareValid) {
          // Calculate proportional base TDS
          if (challanCounter === totalPairs) {
            // Allocate remainder on last challan to avoid rounding penny differences
            pairBaseTds = Math.max(0, totalBaseTds - runningBaseTdsSum);
            pairLateFee = Math.max(0, penalty.payableLateFee234E - runningLateFeeSum);
            pairInterest = Math.max(0, penalty.payableInterest201 - runningInterestSum);
          } else {
            pairBaseTds = Math.round(totalBaseTds * pairFraction);
            pairLateFee = Math.round(penalty.payableLateFee234E * pairFraction);
            pairInterest = Math.round(penalty.payableInterest201 * pairFraction);

            runningBaseTdsSum += pairBaseTds;
            runningLateFeeSum += pairLateFee;
            runningInterestSum += pairInterest;
          }
        }

        const totalChallanAmount = pairBaseTds + pairLateFee + pairInterest;
        const netPayableToSeller = Math.max(0, grossAmount - pairBaseTds);

        challanRecords.push({
          id: `challan_${buyer.id}_${seller.id}`,
          challanNumber: challanCounter,
          buyerIndex: bIdx + 1,
          buyerName: buyer.name || `Buyer ${bIdx + 1}`,
          buyerShare: buyer.sharePercentage,
          sellerIndex: sIdx + 1,
          sellerName: seller.name || `Seller ${sIdx + 1}`,
          sellerShare: seller.sharePercentage,
          pairFraction,
          pairSharePercentage,
          grossAmount,
          taxableBase,
          baseTds: pairBaseTds,
          lateFee234E: pairLateFee,
          interest201: pairInterest,
          totalChallanAmount,
          netPayableToSeller,
        });

        challanCounter++;
      }
    }
  }

  const totalNetToSellers = Math.max(0, totalGrossTranche - totalBaseTds);

  return {
    isApplicable,
    thresholdLimit: TDS_THRESHOLD,
    totalPropertyBase,
    valuationBasis,
    isCircleRateHigher,
    trancheRatio,
    currentTrancheTaxableBase,
    totalBaseTds,
    totalGrossTranche,
    totalNetToSellers,
    challanRecords,
    penalty,
    buyerShareSum,
    sellerShareSum,
    isBuyerShareValid,
    isSellerShareValid,
    validationError,
  };
}
