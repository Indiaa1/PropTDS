import { PenaltyBreakdown } from '../../types/proptds';
import { formatDateDisplay } from '../formatters';

/**
 * Calculates Section 234E Late Filing Fee and Section 201(1A) Interest
 * per Indian Income Tax Act for Form 26QB.
 */
export function calculatePenalty(
  paymentDateStr: string,
  depositDateStr: string,
  totalBaseTds: number
): PenaltyBreakdown {
  if (!paymentDateStr || !depositDateStr || totalBaseTds <= 0) {
    return {
      dueDate: '',
      formattedDueDate: '',
      delayDays: 0,
      isOverdue: false,
      rawLateFee234E: 0,
      payableLateFee234E: 0,
      isLateFeeCapped: false,
      interestMonths201: 0,
      interestRatePercentage: 1.5,
      payableInterest201: 0,
      totalLateCharges: 0,
    };
  }

  const [pYear, pMonth, pDay] = paymentDateStr.split('-').map(Number);
  const [dYear, dMonth, dDay] = depositDateStr.split('-').map(Number);

  // Normalize to UTC midnight to avoid DST / timezone offset issues
  const payDate = new Date(Date.UTC(pYear, pMonth - 1, pDay));
  const depDate = new Date(Date.UTC(dYear, dMonth - 1, dDay));

  // Statutory Due Date: End of transaction month + 30 days
  // End of month for pMonth (1-indexed: Date.UTC(pYear, pMonth, 0))
  const lastDayOfMonth = new Date(Date.UTC(pYear, pMonth, 0));
  const dueDate = new Date(lastDayOfMonth);
  dueDate.setUTCDate(dueDate.getUTCDate() + 30);

  const dueDateStr = dueDate.toISOString().split('T')[0];
  const formattedDueDate = formatDateDisplay(dueDateStr);

  // Compare deposit date with due date
  const isOverdue = depDate.getTime() > dueDate.getTime();

  let delayDays = 0;
  let rawLateFee = 0;
  let payableLateFee = 0;
  let isLateFeeCapped = false;
  let interestMonths = 0;
  let payableInterest = 0;

  if (isOverdue) {
    // Difference in calendar days
    const diffTime = depDate.getTime() - dueDate.getTime();
    delayDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Section 234E: ₹200 per day of delay
    rawLateFee = delayDays * 200;
    
    // Statutory Cap: Section 234E fee cannot exceed the total TDS amount
    if (rawLateFee > totalBaseTds) {
      payableLateFee = totalBaseTds;
      isLateFeeCapped = true;
    } else {
      payableLateFee = rawLateFee;
    }

    // Section 201(1A): Interest on late deposit at 1.5% per month or part of a month
    // from the date of deduction (payDate) to date of payment (depDate).
    // Calculate calendar months / partial months elapsed
    const yearsDiff = depDate.getUTCFullYear() - payDate.getUTCFullYear();
    const monthsDiff = depDate.getUTCMonth() - payDate.getUTCMonth();
    let totalCalendarMonths = yearsDiff * 12 + monthsDiff;

    if (totalCalendarMonths < 0) {
      interestMonths = 0;
    } else {
      // "part of a month" counts as a full month
      // e.g., if pay date is 15 Jan and deposit date is 10 Mar: Jan (part) + Feb (full) + Mar (part) = 3 months
      // If same month and same day = 0
      // If same month and depDate > payDate = 1
      interestMonths = totalCalendarMonths + 1;
    }

    // 1.5% per month
    payableInterest = Math.round(totalBaseTds * 0.015 * interestMonths);
  }

  const totalLateCharges = payableLateFee + payableInterest;

  return {
    dueDate: dueDateStr,
    formattedDueDate,
    delayDays,
    isOverdue,
    rawLateFee234E: rawLateFee,
    payableLateFee234E: payableLateFee,
    isLateFeeCapped,
    interestMonths201: interestMonths,
    interestRatePercentage: 1.5,
    payableInterest201: payableInterest,
    totalLateCharges,
  };
}
