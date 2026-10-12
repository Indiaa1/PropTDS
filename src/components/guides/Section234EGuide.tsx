import React from 'react';
import { Calendar, AlertTriangle, ShieldAlert, ArrowRight, Clock } from 'lucide-react';

interface Section234EGuideProps {
  onGoToCalculator: () => void;
}

export const Section234EGuide: React.FC<Section234EGuideProps> = ({ onGoToCalculator }) => {
  return (
    <article className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <span>Statutory Compliance Guide</span>
          <span aria-hidden="true">·</span>
          <span>Penalties & Late Fees</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Section 234E Calculator – Form 26QB TDS Late Payment Interest & Fee
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Statutory timelines, daily late fee calculations, maximum caps, and monthly interest charges under the Indian Income Tax Act.
        </p>
      </div>

      {/* CTA Box */}
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-amber-950">
            Depositing Form 26QB after the due date?
          </h2>
          <p className="text-xs text-amber-800 mt-0.5">
            <a href="/" onClick={(e) => { e.preventDefault(); onGoToCalculator(); }} className="underline font-semibold hover:text-amber-950">
              Use our Form 26QB calculator
            </a> to compute your exact day-by-day late fee and interest before making payment on e-Pay Tax.
          </p>
        </div>
        <button
          onClick={onGoToCalculator}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <span>Use our Form 26QB calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Section 1: Statutory Due Date */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>1. How the Statutory Due Date is Determined</span>
        </h2>
        <div className="text-xs text-slate-700 leading-relaxed space-y-3">
          <p>
            Under Rule 30(2A) and Section 194-IA of the Income Tax Act, any sum deducted must be paid to the credit of the Central Government <strong>within a period of 30 days from the end of the month in which the deduction is made</strong>.
          </p>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                <tr>
                  <th className="p-3">Payment / Credit Date to Seller</th>
                  <th className="p-3">End of Transaction Month</th>
                  <th className="p-3">Statutory Due Date (+ 30 Days)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-medium">14th July 2026</td>
                  <td className="p-3 text-slate-600">31st July 2026</td>
                  <td className="p-3 font-semibold text-emerald-700">30th August 2026</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">15th January 2026</td>
                  <td className="p-3 text-slate-600">31st January 2026</td>
                  <td className="p-3 font-semibold text-emerald-700">02nd March 2026 (28-day Feb)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">05th March 2026</td>
                  <td className="p-3 text-slate-600">31st March 2026</td>
                  <td className="p-3 font-semibold text-emerald-700">30th April 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 2: Section 234E Late Fee */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>2. Section 234E: ₹200 Per Day Late Filing Fee & The Statutory Cap</span>
        </h2>
        <div className="text-xs text-slate-700 leading-relaxed space-y-3">
          <p>
            If Form 26QB is furnished after the expiry of the statutory due date, the buyer is liable to pay, by way of fee, a sum of <strong>₹200 for every day</strong> during which the failure continues.
          </p>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-semibold text-slate-900">
              The Maximum Cap Rule (Section 234E(2)):
            </div>
            <p className="text-slate-600 leading-relaxed">
              The amount of late fee under Section 234E <strong>cannot exceed the total amount of TDS deductible</strong> for that challan. For example, if the TDS on a property is ₹50,000, and the delay is 400 days (raw fee = ₹80,000), the payable late fee is strictly capped at ₹50,000.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Section 201(1A) Interest */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>3. Section 201(1A): Interest on Delayed Remittance (1.5% Per Month)</span>
        </h2>
        <div className="text-xs text-slate-700 leading-relaxed space-y-3">
          <p>
            In addition to the daily late fee under Section 234E, simple interest is levied under Section 201(1A)(ii) at the rate of <strong>1.5% for every month or part of a month</strong> from the date of deduction to the actual date of payment.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>Fractional Month Rule:</strong> Any fraction of a calendar month is counted as a full month for interest computation per ITD rules.</li>
            <li><strong>Non-Capped:</strong> Unlike Section 234E, Section 201(1A) interest does not have a 100% statutory ceiling and continues to accrue monthly until the tax is deposited.</li>
          </ul>
        </div>
      </section>

      {/* Section 4: ITD Demand Notice 200A */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          4. How to Handle Demand Notices under Section 200A
        </h2>
        <div className="text-xs text-slate-700 leading-relaxed space-y-2">
          <p>
            When a delayed Form 26QB is processed by the Centralized Processing Cell (TDS-CPC), an intimation under Section 200A is generated specifying any outstanding late fee or interest deficit.
          </p>
          <p>
            By computing and paying the exact Section 234E and Section 201(1A) amounts directly in the initial Form 26QB challan (e-Pay Tax), the challan processes with <strong>zero demand notice</strong>, avoiding subsequent penal proceedings or credit blocks on TRACES.
          </p>
        </div>

        {/* Internal Link Anchor Banner */}
        <div className="p-5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
          <div className="space-y-1">
            <div className="font-bold text-sm text-white">Need to calculate your exact 26QB late fee and interest?</div>
            <p className="text-xs text-slate-300">
              Compute your statutory day-by-day liability with our{' '}
              <a href="/" onClick={(e) => { e.preventDefault(); onGoToCalculator(); }} className="text-amber-400 font-semibold underline hover:text-amber-300">
                TDS on property calculator
              </a>.
            </p>
          </div>
          <button
            onClick={onGoToCalculator}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-xs font-semibold text-white cursor-pointer shrink-0"
          >
            Use our Form 26QB calculator
          </button>
        </div>
      </section>
    </article>
  );
};
