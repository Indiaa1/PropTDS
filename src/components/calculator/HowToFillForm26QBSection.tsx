import React from 'react';
import { Calculator, ExternalLink, Calendar, CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';

export const HowToFillForm26QBSection: React.FC = () => {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Official e-Filing 2.0 Walkthrough
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Step-by-Step Guide: How to Fill & File Form 26QB Online
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Follow this 4-step procedure to execute your 26QB TDS on property payment, meet statutory 26QB due date requirements, and avoid Section 234E late filing fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Step 1 */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 hover:border-emerald-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Step 1: Calculate Your 26QB TDS Split
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pl-11">
            Use the PropTDS calculator above to determine exact individual values for Transferee (Buyer) and Transferor (Seller), especially when multiple co-owners are involved. The tool computes fractional consideration, Circle Rate / Section 50C benchmark valuation, and 1% TDS per buyer-seller pair.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 hover:border-emerald-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Step 2: Log In to the e-Filing Portal
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pl-11">
            Visit the official portal (<a href="https://incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-0.5">incometax.gov.in <ExternalLink className="w-3 h-3 inline" /></a>), navigate to <strong>e-File &gt; e-Pay Tax &gt; New Payment</strong>, and select <strong>Form 26QB (TDS on Sale of Property)</strong>.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 hover:border-emerald-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Step 3: Enter Details & Verify Due Date
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pl-11">
            Input PAN of buyer and seller, property details, total consideration, and payment date. Note the mandatory <strong>26QB due date</strong> (within 30 days from the end of the month in which deduction is made) to avoid statutory late fees and interest under Section 201(1A).
          </p>
        </div>

        {/* Step 4 */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 hover:border-emerald-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
              4
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Step 4: Execute Payment & Complete Form 26QB Filing
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pl-11">
            Pay the base TDS along with any penalty calculated under Section 234E via Net Banking, Debit Card, or UPI. Download the challan acknowledgement (CRN receipt) immediately and issue Form 16B certificate from TRACES within 15 days.
          </p>
        </div>
      </div>
    </section>
  );
};
