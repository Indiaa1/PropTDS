import React from 'react';
import { ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';

interface EfilingGuideProps {
  onGoToCalculator: () => void;
}

export const EfilingGuide: React.FC<EfilingGuideProps> = ({ onGoToCalculator }) => {
  const steps = [
    {
      step: '01',
      title: 'Log In to the Income Tax Portal',
      desc: 'Visit incometax.gov.in and log in using the Buyer (Transferee) PAN and password. No TAN (Tax Deduction and Collection Account Number) is required for Section 194-IA.',
    },
    {
      step: '02',
      title: 'Navigate to e-Pay Tax',
      desc: 'In the top menu, go to "e-File" -> "e-Pay Tax" -> Click on "+ New Payment" in the top right corner.',
    },
    {
      step: '03',
      title: 'Select "TDS on Sale of Property (Form 26QB)"',
      desc: 'Among the available payment tiles, choose the tile labeled "TDS on Sale of Property (Form 26QB)" and click Proceed.',
    },
    {
      step: '04',
      title: 'Fill Buyer & Seller PAN Details (Tab 1)',
      desc: 'Enter Resident Seller PAN. The system will auto-populate the seller\'s full name from the Income Tax database. Verify this matches the Sale Agreement.',
    },
    {
      step: '05',
      title: 'Property Details & Valuation (Tab 2)',
      desc: 'Select Property Type (Land / Building). Enter Address. Under Consideration, enter the Total Agreement Value and Stamp Duty Value computed in PropTDS.',
    },
    {
      step: '06',
      title: 'Payment Breakdown & Penalties (Tab 3)',
      desc: 'Enter the exact Basic TDS (1%), Section 234E Late Fee (if overdue), and Section 201(1A) Interest as provided in your PropTDS Challan Matrix table.',
    },
    {
      step: '07',
      title: 'Execute Payment via Netbanking / UPI',
      desc: 'Complete payment via Netbanking, Debit Card, NEFT/RTGS, or Payment Gateway (UPI). Download the Challan Receipt (CRN).',
    },
    {
      step: '08',
      title: 'Download Form 16B from TRACES',
      desc: 'After 15-20 days when Form 26QB processes, register/login to TRACES (tdscpc.gov.in) as a Taxpayer and download Form 16B TDS Certificate for the seller.',
    },
  ];

  return (
    <article className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <span>Official Walkthrough</span>
          <span aria-hidden="true">·</span>
          <span>e-Filing 2.0 / TIN 2.0</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Step-by-Step Form 26QB Filing on Income Tax Portal
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Comprehensive walkthrough for submitting Form 26QB and remitting property TDS on incometax.gov.in without consultant assistance.
        </p>
      </div>

      {/* Official Portal Link */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs text-slate-400">Official Government Gateway:</div>
          <div className="text-sm font-bold text-white">e-Filing Portal of Income Tax Department, Govt of India</div>
        </div>
        <a
          href="https://eportal.incometax.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <span>Open e-Filing Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Step-by-Step Filing Sequence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((s) => (
            <div key={s.step} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  STEP {s.step}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA back to calculator */}
      <div className="pt-4 border-t border-slate-200 flex justify-end">
        <button
          onClick={onGoToCalculator}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <span>Ready to Calculate Form 26QB Numbers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
