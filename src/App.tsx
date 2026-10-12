/**
 * PropTDS - Property TDS & Form 26QB Split Calculator
 * @license Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewTab } from './types/proptds';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CalculatorContainer } from './components/calculator/CalculatorContainer';
import { JointBuyersGuide } from './components/guides/JointBuyersGuide';
import { Section234EGuide } from './components/guides/Section234EGuide';
import { EfilingGuide } from './components/guides/EfilingGuide';
import { LegalPages } from './components/legal/LegalPages';
import { PdfExportModal } from './components/calculator/PdfExportModal';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { calculatePropTds } from './lib/calculations/splitEngine';
import { WifiOff } from 'lucide-react';

const TAB_TO_PATH: Record<ViewTab, string> = {
  'calculator': '/',
  'guide-joint-buyers': '/guides/joint-buyers-form-26qb',
  'guide-234e': '/guides/section-234e-late-fee-calculation',
  'efiling-guide': '/guides/efiling-guide',
  'legal-disclaimer': '/legal/disclaimer',
  'legal-privacy': '/legal/privacy-policy',
  'legal-terms': '/legal/terms',
};

const TAB_TITLES: Record<ViewTab, string> = {
  'calculator': 'Form 26QB Calculator & Filing Guide (TDS on Property & 234E Calculator) | PropTDS',
  'guide-joint-buyers': 'How to File Form 26QB for Joint Buyers & Co-Owners | PropTDS',
  'guide-234e': 'Section 234E Calculator – Form 26QB TDS Late Payment Interest & Fee | PropTDS',
  'efiling-guide': 'Step-by-Step e-Pay Tax Form 26QB Filing Guide | PropTDS',
  'legal-disclaimer': 'Statutory Tax & Legal Disclaimer | PropTDS',
  'legal-privacy': 'Privacy Policy & Zero Data Retention | PropTDS',
  'legal-terms': 'Terms & Conditions of Use | PropTDS',
};

function getTabFromPath(pathname: string): ViewTab {
  const clean = pathname.replace(/\/+$/, '') || '/';
  for (const [tab, path] of Object.entries(TAB_TO_PATH)) {
    if (path === clean) {
      return tab as ViewTab;
    }
  }
  return 'calculator';
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>(() => {
    if (typeof window !== 'undefined') {
      return getTabFromPath(window.location.pathname);
    }
    return 'calculator';
  });

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const isOnline = useOnlineStatus();

  // Reference input for PDF generation modal
  const [activeInput, setActiveInput] = useState(() => {
    try {
      const saved = localStorage.getItem('proptds_state_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.agreementValue === 7500000 && parsed.circleRateValue === 7500000 && parsed.buyers?.length === 1 && parsed.sellers?.length === 1) {
          return {
            ...parsed,
            agreementValue: 6000000,
            circleRateValue: 6000000,
            installmentAmount: 6000000,
          };
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return {
      agreementValue: 6000000,
      circleRateValue: 6000000,
      installmentAmount: 6000000,
      paymentDate: '2026-10-01',
      depositDate: '2026-10-12',
      buyers: [{ id: 'b1', name: 'Buyer 1', sharePercentage: 100 }],
      sellers: [{ id: 's1', name: 'Seller 1', sharePercentage: 100 }],
    };
  });

  const activeResult = calculatePropTds(activeInput);

  // Sync tab changes with URL and document title
  const handleSelectTab = (tab: ViewTab, updateHistory = true) => {
    setCurrentTab(tab);
    const targetPath = TAB_TO_PATH[tab] || '/';
    if (updateHistory && typeof window !== 'undefined') {
      window.history.pushState({ tab }, '', targetPath);
    }
    if (typeof document !== 'undefined') {
      document.title = TAB_TITLES[tab] || TAB_TITLES['calculator'];
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromPath(window.location.pathname);
      handleSelectTab(tab, false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenPdfModal = () => {
    try {
      const saved = localStorage.getItem('proptds_state_v1');
      if (saved) {
        setActiveInput(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsPdfModalOpen(true);
  };

  const handleLoadJointPreset = () => {
    try {
      const jointPreset = {
        agreementValue: 12000000,
        circleRateValue: 12000000,
        installmentAmount: 12000000,
        paymentDate: '2026-10-01',
        depositDate: '2026-10-11',
        buyers: [
          { id: 'b1', name: 'Buyer 1 (Husband)', sharePercentage: 50 },
          { id: 'b2', name: 'Buyer 2 (Wife)', sharePercentage: 50 },
        ],
        sellers: [
          { id: 's1', name: 'Seller 1 (Co-owner A)', sharePercentage: 50 },
          { id: 's2', name: 'Seller 2 (Co-owner B)', sharePercentage: 50 },
        ],
      };
      localStorage.setItem('proptds_state_v1', JSON.stringify(jointPreset));
      setActiveInput(jointPreset);
    } catch {
      // ignore
    }
    handleSelectTab('calculator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Offline Status Warning Bar */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs px-4 py-1.5 flex items-center justify-center gap-2 font-medium z-50">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode — PropTDS runs 100% locally in your browser memory.</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => handleSelectTab(tab)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'calculator' && (
          <CalculatorContainer onOpenPdfModal={handleOpenPdfModal} />
        )}

        {currentTab === 'guide-joint-buyers' && (
          <JointBuyersGuide onLoadJointPreset={handleLoadJointPreset} />
        )}

        {currentTab === 'guide-234e' && (
          <Section234EGuide onGoToCalculator={() => handleSelectTab('calculator')} />
        )}

        {currentTab === 'efiling-guide' && (
          <EfilingGuide onGoToCalculator={() => handleSelectTab('calculator')} />
        )}

        {currentTab === 'legal-disclaimer' && (
          <LegalPages type="disclaimer" onBackToCalculator={() => handleSelectTab('calculator')} />
        )}

        {currentTab === 'legal-privacy' && (
          <LegalPages type="privacy" onBackToCalculator={() => handleSelectTab('calculator')} />
        )}

        {currentTab === 'legal-terms' && (
          <LegalPages type="terms" onBackToCalculator={() => handleSelectTab('calculator')} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => handleSelectTab(tab)}
      />

      {/* PDF Export Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        input={activeInput}
        result={activeResult}
      />
    </div>
  );
}
