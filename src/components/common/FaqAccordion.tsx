import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'applicability' | 'joint-buyers' | 'penalties' | 'traces';
}

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FaqItem[] = [
    {
      category: 'penalties',
      question: 'What is the statutory 26QB due date for property TDS deposit?',
      answer:
        'Under Section 194-IA, the 26QB due date is 30 calendar days from the end of the month in which tax was deducted. For example, if payment is made on 15th July, Form 26QB must be filed and deposited by 30th August.',
    },
    {
      category: 'penalties',
      question: 'How does the Section 234E calculator compute late filing fees?',
      answer:
        'The Section 234E fee is a mandatory penalty of ₹200 per day for every day of delay past the statutory 26QB due date. The maximum fee payable is capped at the total TDS amount for that transaction.',
    },
    {
      category: 'joint-buyers',
      question: 'How to calculate TDS on property with multiple co-owners?',
      answer:
        "When there are joint buyers or co-sellers, TDS (1%) is calculated on each co-owner's proportionate share of the higher of Agreement Value or Circle Rate. A separate Form 26QB must be filed for every unique buyer-seller combination.",
    },
    {
      category: 'applicability',
      question: 'When is TDS under Section 194-IA mandatory?',
      answer:
        'TDS under Section 194-IA is mandatory whenever a resident buyer purchases immovable property (other than agricultural land) from a resident seller where the total consideration or stamp duty value (circle rate valuation) is ₹50,00,000 or more. The statutory deduction rate is 1% of the higher valuation.',
    },
    {
      category: 'applicability',
      question: 'What if the Agreement Value is ₹48 Lakhs but Circle Rate is ₹52 Lakhs?',
      answer:
        'Following statutory amendments aligning Section 194-IA with Section 50C, TDS is mandatory on the higher value. Since the Circle Rate exceeds the ₹50 Lakh threshold, TDS must be deducted at 1% on ₹52 Lakhs (₹52,000 TDS). The buyer deducts ₹52,000 from the payment to the seller, paying ₹47,48,000 net to the seller.',
    },
    {
      category: 'joint-buyers',
      question: 'Do co-owners need to file separate Form 26QB challans?',
      answer:
        'Yes. Form 26QB is strictly a PAN-to-PAN filing. If there are 2 buyers and 2 sellers, exactly 4 separate Form 26QB filings must be completed (2 × 2 = 4). Each filing reflects the fractional consideration and proportional 1% TDS for that specific pair.',
    },
    {
      category: 'joint-buyers',
      question: 'If 2 buyers buy a property for ₹60 Lakhs (₹30 Lakhs each), is TDS applicable?',
      answer:
        'Yes! Per landmark rulings (including Delhi High Court rulings) and ITD guidelines, the ₹50 Lakh threshold applies to the total value of the immovable property, not the fractional share of each individual buyer. Since the property value is ₹60 Lakhs (>= ₹50L), both co-buyers must deduct 1% on their respective ₹30 Lakh shares.',
    },
    {
      category: 'penalties',
      question: 'What is the interest rate under Section 201(1A)?',
      answer:
        'Interest is charged at 1.5% per month or part of a month from the date of deduction to the actual date of payment. Any partial month is considered a full month per Rule 119A.',
    },
    {
      category: 'traces',
      question: 'What is Form 16B and how does the seller get it?',
      answer:
        'Form 16B is the official TDS certificate generated on the TRACES portal (tdscpc.gov.in) validating that the buyer has remitted the tax. The buyer must register on TRACES, download Form 16B (typically available 15 days after challan processing), and provide it to the seller so the seller can claim tax credit in their ITR.',
    },
    {
      category: 'applicability',
      question: 'Does Section 194-IA apply to Non-Resident Indian (NRI) sellers?',
      answer:
        'No. Section 194-IA applies exclusively to resident transferors. If the seller is an NRI, TDS is governed by Section 195, which requires the buyer to obtain a TAN (Tax Deduction Account Number) and deduct TDS at capital gains rates (often 20% + surcharge/cess) or per a lower deduction certificate (Form 13).',
    },
  ];

  const filteredFaqs =
    activeCategory === 'all'
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-6">
      <div className="space-y-1 border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>Frequently Asked Questions & Statutory Rules</span>
        </h2>
        <p className="text-xs text-slate-500">
          Clear answers to common questions regarding Section 194-IA, Form 26QB, co-owners, and late fees.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'applicability', label: 'Threshold & Rates' },
          { id: 'joint-buyers', label: 'Joint Buyers & Splits' },
          { id: 'penalties', label: 'Due Dates & Penalties' },
          { id: 'traces', label: 'Form 16B & TRACES' },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeCategory === c.id
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Accordion Items */}
      <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-white transition-colors">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-3.5 px-4 flex items-center justify-between text-left gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-900">
                  {faq.question}
                </span>
                <span className="text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
