import React, { useState } from 'react';
import { ViewTab } from '../../types/proptds';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Download, HelpCircle, FileText, Calculator, BookOpen, Menu, X, Smartphone } from 'lucide-react';

interface HeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onOpenPdfModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab }) => {
  const { isInstallable, install, isIOS } = usePWAInstall();
  const [showInstallGuideModal, setShowInstallGuideModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
    { id: 'calculator', label: 'TDS Calculator', icon: <Calculator className="w-4 h-4" /> },
    { id: 'guide-joint-buyers', label: 'Joint Buyers Rules', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'guide-234e', label: 'Late Fees & Interest', icon: <FileText className="w-4 h-4" /> },
    { id: 'efiling-guide', label: 'e-Filing Guide', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleInstallClick = () => {
    if (isInstallable) {
      install();
    } else if (isIOS) {
      setShowInstallGuideModal(true);
    } else {
      // If browser doesn't expose native beforeinstallprompt (e.g. desktop Chrome already installed or Firefox/Safari)
      setShowInstallGuideModal(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => {
              onSelectTab('calculator');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-sm ring-1 ring-emerald-400/30 text-sm sm:text-base">
              ₹
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                PropTDS
                <span className="text-[10px] font-normal uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60 hidden xs:inline">
                  Sec 194-IA
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 leading-none">
                Section 194-IA · Form 26QB Split
              </div>
            </div>
          </button>

          {/* Zone 2: Desktop Nav Links */}
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

          {/* Zone 3: Install App Button in Top Navbar & Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Install App button in Navbar on both mobile and desktop */}
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer min-h-[36px]"
              title="Install PropTDS on your device for instant offline access"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-md cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown (Strictly Nav Links, No Duplicates) */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-800 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-md text-left cursor-pointer min-h-[44px] ${
                  currentTab === link.id
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Clean PWA Install Guide Modal */}
      {showInstallGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-xl bg-slate-900 border border-slate-700 p-5 text-white shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-base shadow-sm ring-1 ring-emerald-400/30">
                ₹
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">PropTDS</h3>
                <p className="text-[11px] text-slate-400">Offline PWA App</p>
              </div>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed space-y-2">
              <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                How to install PropTDS:
              </p>
              {isIOS ? (
                <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                  <li>Tap the <strong>Share</strong> button (box with upward arrow) in the Safari toolbar.</li>
                  <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                  <li>Tap <strong>Add</strong> in the top right. PropTDS will launch as a native standalone app.</li>
                </ol>
              ) : (
                <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                  <li>Tap the browser menu (three dots in Chrome / Edge).</li>
                  <li>Select <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
                  <li>PropTDS will be added to your home screen or desktop.</li>
                </ol>
              )}
            </div>

            <button
              onClick={() => setShowInstallGuideModal(false)}
              className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
