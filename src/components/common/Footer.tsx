import React from 'react';
import { ViewTab } from '../../types/proptds';
import { ShieldCheck, Lock, Award, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Privacy & Zero-Data Guarantee Banner */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-sm">
                Privacy-First · Zero Database · No PAN Capture
              </div>
              <div className="text-slate-400 text-xs">
                All calculations run locally in your browser memory. No financial numbers or personal data are ever transmitted to any remote server.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs shrink-0">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Client-Side Engine
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Sec 194-IA / 50C Compliant</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Finance Act 2026 Ready</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About PropTDS */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                ₹
              </div>
              <span className="text-sm font-bold text-white">PropTDS</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-lg">
              PropTDS is a specialized computational utility built for Indian property buyers, co-purchasers, deed writers, and tax professionals. It resolves multi-buyer and multi-seller Form 26QB splits, evaluates Circle Rate vs Agreement Value under Section 50C, and calculates statutory Section 234E late fees and Section 201(1A) interest.
            </p>
            <div className="text-[11px] text-slate-500">
              Portal Reference: Income Tax e-Filing 2.0 (e-Pay Tax) & TRACES Form 16B Certificate System.
            </div>
          </div>

          {/* Col 2: Educational Pillar Guides */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Statutory Guides
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('guide-joint-buyers')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Joint Buyers Form 26QB Rules & Splits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('guide-234e')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Section 234E Late Fee & 201(1A) Interest
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('efiling-guide')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Step-by-Step e-Pay Tax Portal Walkthrough
                </button>
              </li>
              <li>
                <a
                  href="https://incometax.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  Official ITD e-Filing Portal
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Regulatory Disclosures */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Legal & Disclosures
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('legal-disclaimer')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Statutory Disclaimer (Not Tax Advice)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('legal-privacy')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy & Zero Data Retention
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('legal-terms')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Terms and Conditions of Use
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Statutory Disclaimer Box */}
        <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Statutory Notice:</strong> PropTDS is an independent calculation tool designed for educational, informational, and pre-filing validation purposes only. It is neither affiliated with nor endorsed by the Directorate of Income Tax (Systems), the Central Board of Direct Taxes (CBDT), or the TRACES portal. Section 194-IA applies exclusively to resident transferors; purchases from Non-Resident Indians (NRIs) fall under Section 195 and require separate procedure. Always cross-verify Registry Deed financials and consult a certified Chartered Accountant or legal practitioner before executing tax payments.
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} PropTDS. Built for transparent Indian real estate compliance.
          </div>
          <div className="flex items-center gap-4">
            <span>Serverless Edge Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Local Storage Persistence</span>
            <span aria-hidden="true">·</span>
            <span>Strict Client-Side Math</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
