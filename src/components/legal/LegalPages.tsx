import React from 'react';
import { ViewTab } from '../../types/proptds';
import { ShieldCheck, ArrowLeft, Lock, FileText, AlertTriangle } from 'lucide-react';

interface LegalPagesProps {
  type: 'disclaimer' | 'privacy' | 'terms';
  onBackToCalculator: () => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ type, onBackToCalculator }) => {
  return (
    <article className="max-w-3xl mx-auto space-y-6 py-4">
      <button
        onClick={onBackToCalculator}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Calculator
      </button>

      {type === 'disclaimer' && (
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Statutory Tax & Legal Disclaimer
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Last updated: October 2026 · Section 194-IA Compliance
            </p>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed space-y-3">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-950 font-medium">
              PropTDS is an independent mathematical simulation and pre-filing validation utility. It does not provide Chartered Accountancy, legal, investment, or statutory tax advisory services.
            </div>

            <h2 className="text-sm font-bold text-slate-900 pt-2">No Government Affiliation</h2>
            <p>
              PropTDS is not owned, operated, or endorsed by the Directorate of Income Tax (Systems), the Central Board of Direct Taxes (CBDT), TRACES (TDS Reconciliation Analysis and Correction Enabling System), or any state property registration department.
            </p>

            <h2 className="text-sm font-bold text-slate-900 pt-2">Verification Requirement</h2>
            <p>
              While all formulas have been verified against Section 194-IA, Section 50C, Section 234E, Section 201(1A), and relevant judicial pronouncements (including <em>Harbans Kaur</em> and <em>Adit Anand</em>), users are strongly advised to verify figures against their executed sale deed and consult a qualified Chartered Accountant before remitting tax to the Government Treasury.
            </p>

            <h2 className="text-sm font-bold text-slate-900 pt-2">Non-Resident Seller Exclusion</h2>
            <p>
              This utility is strictly calibrated for property purchases from Resident Indian transferors under Section 194-IA. Transactions involving Non-Resident Indian (NRI) sellers are governed by Section 195 and require separate TAN-based procedures and lower deduction certificates.
            </p>
          </div>
        </div>
      )}

      {type === 'privacy' && (
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Privacy Policy & Zero Data Retention Disclosure
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Privacy-First Architecture · Digital Personal Data Protection (DPDP) Act Compliance
            </p>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed space-y-3">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950 font-medium flex items-center gap-3">
              <Lock className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                Zero Personal Data Collection: We do not collect or request Permanent Account Numbers (PAN), Aadhaar, bank details, or phone numbers.
              </span>
            </div>

            <h2 className="text-sm font-bold text-slate-900 pt-2">1. 100% Client-Side Processing</h2>
            <p>
              All property financial calculations, co-ownership fractional splits, and late fee estimations are executed locally inside your web browser’s JavaScript engine. No financial numbers are ever transmitted over the network or saved to any external database.
            </p>

            <h2 className="text-sm font-bold text-slate-900 pt-2">2. Local Storage Persistence</h2>
            <p>
              To prevent accidental data loss when refreshing the browser, the application may temporarily store your form entries in your device’s local storage (<code className="bg-slate-100 px-1 py-0.5 rounded">localStorage.proptds_state_v1</code>). This data resides exclusively on your device and can be cleared at any time via your browser settings.
            </p>

            <h2 className="text-sm font-bold text-slate-900 pt-2">3. Cookieless Privacy-Preserving Analytics</h2>
            <p>
              We utilize privacy-respecting, cookieless edge metrics to monitor application availability and error rates. No cross-site tracking, fingerprinting, or advertising identifiers are utilized.
            </p>
          </div>
        </div>
      )}

      {type === 'terms' && (
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Terms & Conditions of Use
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Usage Scope · Intellectual Property · Limitation of Liability
            </p>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed space-y-3">
            <h2 className="text-sm font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using PropTDS, you acknowledge and agree to these Terms and Conditions. If you do not agree, please discontinue using the tool.
            </p>

            <h2 className="text-sm font-bold text-slate-900 pt-2">2. Permitted Use</h2>
            <p>
              PropTDS is provided free of charge for individual property purchasers, document writers, advocates, and tax professionals for calculating Form 26QB splits and printing filing schedules.
            </p>

            <h2 className="text-sm font-bold text-slate-900 pt-2">3. Limitation of Liability</h2>
            <p>
              In no event shall PropTDS, its developers, or contributors be liable for any direct, indirect, punitive, or consequential damages resulting from inaccurate inputs, discrepancies between deed values and challan payments, or delayed deposits leading to statutory penalties under the Income Tax Act.
            </p>
          </div>
        </div>
      )}
    </article>
  );
};
