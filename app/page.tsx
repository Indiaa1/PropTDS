import React from 'react';

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Hero Header */}
      <header className="space-y-2 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Form 26QB TDS on Property Calculator & Joint Split Tool
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          An online utility to calculate TDS on property purchase (Section 194-IA), generate multi-party Form 26QB filing schedules, and calculate Section 234E late fee interest.
        </p>
      </header>

      {/* Section 1 */}
      <section className="bg-white p-6 rounded-xl border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900">
          1. How to Calculate TDS on Property Purchase (Section 194-IA)
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Calculate Section 194-IA TDS at 1% of the higher of Agreement Value or Circle Rate (Stamp Duty Value) for property transactions worth ₹50 Lakhs or more.
        </p>
      </section>

      {/* Section 3 */}
      <section className="bg-white p-6 rounded-xl border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900">
          3. Check 26QB Due Date & Section 234E Late Fee Calculator
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          The statutory 26QB due date is 30 days from the end of the month in which deduction was made. Late deposit attracts ₹200/day fee under Section 234E and 1.5%/month interest under Section 201(1A).
        </p>
      </section>

      {/* Dedicated Step-by-Step Guide */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Step-by-Step Guide: How to Fill & File Form 26QB Online
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-900">Step 1: Calculate Your 26QB TDS Split</h3>
            <p>Use the PropTDS calculator to determine exact individual values for Transferee (Buyer) and Transferor (Seller), especially when multiple co-owners are involved.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-900">Step 2: Log In to the e-Filing Portal</h3>
            <p>Visit incometax.gov.in, navigate to e-File &gt; e-Pay Tax &gt; New Payment, and select Form 26QB (TDS on Sale of Property).</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-900">Step 3: Enter Details & Verify Due Date</h3>
            <p>Input PAN of buyer and seller, property details, total consideration, and payment date. Note the mandatory 26QB due date (within 30 days from the end of the month).</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-900">Step 4: Execute Payment & Complete Form 26QB Filing</h3>
            <p>Pay the base TDS along with any Section 234E penalty via Net Banking or UPI. Download challan acknowledgement and obtain Form 16B from TRACES within 15 days.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
        <div className="space-y-3 text-xs text-slate-700">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900">What is the statutory 26QB due date for property TDS deposit?</h3>
            <p className="mt-1 text-slate-600">Under Section 194-IA, the 26QB due date is 30 calendar days from the end of the month in which tax was deducted. For example, if payment is made on 15th July, Form 26QB must be filed and deposited by 30th August.</p>
          </div>
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900">How does the Section 234E calculator compute late filing fees?</h3>
            <p className="mt-1 text-slate-600">The Section 234E fee is a mandatory penalty of ₹200 per day for every day of delay past the statutory 26QB due date. The maximum fee payable is capped at the total TDS amount for that transaction.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">How to calculate TDS on property with multiple co-owners?</h3>
            <p className="mt-1 text-slate-600">When there are joint buyers or co-sellers, TDS (1%) is calculated on each co-owner's proportionate share of the higher of Agreement Value or Circle Rate. A separate Form 26QB must be filed for every unique buyer-seller combination.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
