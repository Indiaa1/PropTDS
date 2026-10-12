export interface Party {
  id: string;
  name: string; // e.g. "Buyer 1 (Rohan)", "Seller 1"
  sharePercentage: number;
}

export interface CalculationInput {
  agreementValue: number;
  circleRateValue: number;
  installmentAmount: number;
  paymentDate: string; // YYYY-MM-DD
  depositDate: string; // YYYY-MM-DD
  buyers: Party[];
  sellers: Party[];
}

export interface PenaltyBreakdown {
  dueDate: string; // YYYY-MM-DD
  formattedDueDate: string;
  delayDays: number;
  isOverdue: boolean;
  rawLateFee234E: number;
  payableLateFee234E: number;
  isLateFeeCapped: boolean;
  interestMonths201: number;
  interestRatePercentage: number;
  payableInterest201: number;
  totalLateCharges: number;
}

export interface ChallanSplitRecord {
  id: string;
  challanNumber: number;
  buyerIndex: number;
  buyerName: string;
  buyerShare: number;
  sellerIndex: number;
  sellerName: string;
  sellerShare: number;
  pairFraction: number; // e.g. 0.25 (25%)
  pairSharePercentage: number; // e.g. 25
  grossAmount: number;
  taxableBase: number;
  baseTds: number;
  lateFee234E: number;
  interest201: number;
  totalChallanAmount: number;
  netPayableToSeller: number;
}

export interface SplitCalculationResult {
  isApplicable: boolean; // false if max(V_agree, V_circle) < 50,00,000
  thresholdLimit: number; // 50,00,000
  totalPropertyBase: number; // max(V_agree, V_circle)
  valuationBasis: 'AGREEMENT_VALUE' | 'CIRCLE_RATE';
  isCircleRateHigher: boolean;
  trancheRatio: number; // V_tranche / V_agree
  currentTrancheTaxableBase: number;
  totalBaseTds: number;
  totalGrossTranche: number;
  totalNetToSellers: number;
  challanRecords: ChallanSplitRecord[];
  penalty: PenaltyBreakdown;
  buyerShareSum: number;
  sellerShareSum: number;
  isBuyerShareValid: boolean;
  isSellerShareValid: boolean;
  validationError?: string;
}

export type ViewTab = 'calculator' | 'guide-joint-buyers' | 'guide-234e' | 'efiling-guide' | 'legal-disclaimer' | 'legal-privacy' | 'legal-terms';
