import React, { useState } from 'react';
import { ViewTab } from '../../types/proptds';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Download, ShieldCheck, HelpCircle, FileText, Calculator, BookOpen, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onOpenPdfModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, onOpenPdfModal }) => {
  const { isInstallable, install, isIOS } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
    { id: 'calculator', label: 'TDS Calculator', icon: <Calculator className="w-4 h-4" /> },
    { id: 'guide-joint-buyers', label: 'Joint Buyers Rules', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'guide-234e', label: 'Late Fees & Interest', icon: <FileText className="w-4 h-4" /> },
    { id: 'efiling-guide', label: 'e-Filing Guide', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => {
              onSelectTab('calculator');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-sm ring-1 ring-emerald-400/30">
              ₹
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                PropTDS
                <span className="text-[10px] font-normal uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60">
                  Sec 194-IA
                </span>
              </div>
              <div className="text-[11px] text-slate-400 leading-none">
                प्रॉपटीडीएस · Form 26QB Split
              </div>
            </div>
          </button>

          {/* Zone 2: Nav Links (Clean single-line text links) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 text-sm cursor-pointer ${
                    isActive
                      ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400 pb-0.5'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & PWA Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {isInstallable && (
              <button
                onClick={install}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 rounded-md hover:bg-emerald-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                title="Install offline PWA on your device"
              >
                <Download className="w-3.5 h-3.5" />
                Install App
              </button>
            )}

            {isIOS && !isInstallable && (
              <button
                onClick={() => setShowIOSModal(true)}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 bg-slate-800 rounded border border-slate-700 hover:bg-slate-700 whitespace-nowrap cursor-pointer"
              >
                Add to Home
              </button>
            )}

            {onOpenPdfModal && (
              <button
                onClick={onOpenPdfModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download Challan PDF
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-md cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-800 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-md text-left ${
                  currentTab === link.id
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
            {isInstallable && (
              <button
                onClick={() => {
                  install();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-emerald-400 hover:bg-slate-800/60 rounded-md"
              >
                <Download className="w-4 h-4" />
                Install App to Home Screen
              </button>
            )}
          </div>
        )}
      </div>

      {/* iOS Safari Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-xl bg-slate-900 border border-slate-700 p-6 text-white shadow-2xl">
            <h3 className="text-base font-semibold">Install PropTDS on iOS</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              1. Tap the <strong>Share</strong> button (box with upward arrow) in the Safari toolbar.<br />
              2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
              3. Tap <strong>Add</strong> in the top right. PropTDS will run 100% offline.
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-4 w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
