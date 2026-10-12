/**
 * Indian currency & date formatters for PropTDS
 */

export function formatINR(amount: number, includeDecimals = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  const rounded = includeDecimals ? Math.round(amount * 100) / 100 : Math.round(amount);
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(rounded);
  return `₹${formatted}`;
}

export function formatWordsIndian(amount: number): string {
  if (!amount || isNaN(amount) || amount <= 0) return 'Zero';
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `${cr.toFixed(2).replace(/\.00$/, '')} Crore`;
  }
  if (amount >= 100000) {
    const lk = amount / 100000;
    return `${lk.toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  if (amount >= 1000) {
    const th = amount / 1000;
    return `${th.toFixed(1).replace(/\.0$/, '')} Thousand`;
  }
  return `${amount}`;
}

export function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function parseNumberInput(value: string): number {
  if (!value) return 0;
  // Remove commas, currency symbols, and spaces
  const cleaned = value.replace(/[₹,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}
