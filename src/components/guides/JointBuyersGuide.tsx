import React from 'react';
import { Users, AlertTriangle, Scale, CheckCircle2, ArrowRight } from 'lucide-react';

interface JointBuyersGuideProps {
  onLoadJointPreset: () => void;
}

export const JointBuyersGuide: React.FC<JointBuyersGuideProps> = ({ onLoadJointPreset }) => {
  return (
    <article className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <span>Statutory Compliance Guide</span>
          <span aria-hidden="true">·</span>
          <span>Section 194-IA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Joint Buyers & Co-Sellers: Complete Form 26QB TDS Filing Guide
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          How to correctly split and file Form 26QB when multiple buyers purchase property from multiple sellers under Indian Income Tax Act regulations.
        </p>
      </div>

      {/* Quick CTA Box */}
      <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-emerald-950">
            Have a 2 Buyers × 2 Sellers transaction?
          </h2>
          <p className="text-xs text-emerald-800 mt-0.5">
            Load our pre-configured joint purchase split preset into the calculator instantly.
          </p>
        </div>
        <button
          onClick={onLoadJointPreset}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <span>Load 2×2 Joint Preset</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Pillar 1: The Multiplication Rule */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>1. The Multi-Party Formula: (N_Buyers × N_Sellers) Unique Filings</span>
        </h2>
        <div className="text-xs text-slate-700 leading-relaxed space-y-3">
          <p>
            Under Section 194-IA, Form 26QB is not filed on a per-property basis. Instead, it is filed strictly on a <strong>PAN-to-PAN pair basis</strong>. Each buyer must deduct and remit tax against the PAN of each resident seller.
          </p>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
            Total Required Form 26QB Filings = Number of Buyers (N_B) × Number of Sellers (N_S)
          </div>
          <p>
            For example:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>1 Buyer purchasing from 2 Co-Sellers:</strong> Requires 2 distinct 26QB filings (Buyer 1 → Seller 1, and Buyer 1 → Seller 2).</li>
            <li><strong>2 Buyers (Husband & Wife) purchasing from 1 Seller:</strong> Requires 2 distinct 26QB filings (Buyer 1 → Seller 1, and Buyer 2 → Seller 1).</li>
            <li><strong>2 Buyers purchasing from 2 Sellers:</strong> Requires <strong>4 distinct 26QB filings</strong> (B1 → S1, B1 → S2, B2 → S1, B2 → S2).</li>
          </ul>
        </div>
      </section>

      {/* Pillar 2: The Aggregate ₹50 Lakh Threshold Rule */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>2. The ₹50 Lakh Threshold: Total Property Value vs Individual Share</span>
        </h2>
        <div className="text-xs text-slate-700 leading-relaxed space-y-3">
          <p>
            One of the most frequent errors made by homebuyers and document writers is assuming that if an individual co-buyer's share is less than ₹50,00,000, Section 194-IA does not apply.
          </p>
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-700" />
              Judicial Clarification & ITD Stance:
            </div>
            <p>
              In landmark decisions including <em>Harbans Kaur</em> and Delhi High Court clarifications, as well as the Finance Act statutory wording, the ₹50,00,000 threshold applies to the <strong>total consideration of the immovable property</strong> (or its stamp duty valuation).
            </p>
            <p>
              <strong>Illustration:</strong> If a property is purchased for ₹80,00,000 by two co-buyers sharing 50:50 (₹40,00,000 each), TDS under Section 194-IA <strong>is mandatory for both buyers</strong> because the total property value exceeds ₹50 Lakhs. Each buyer must deduct 1% on their respective ₹40 Lakh share (₹40,000 TDS each).
            </p>
          </div>
        </div>
      </section>

      {/* Pillar 3: Stamp Duty Value (Circle Rate) vs Agreement Value */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>3. Section 50C Alignment: Circle Rate Higher Than Agreement Value</span>
        </h2>
        <div className="text-xs text-slate-700 leading-relaxed space-y-3">
          <p>
            Following statutory amendments to Section 194-IA, TDS must be calculated on the higher of:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>The actual consideration agreed upon in the sale agreement.</li>
            <li>The stamp duty value (circle rate valuation) determined by the state registrar.</li>
          </ul>
          <p>
            If the stamp duty value is higher, the total TDS is 1% of the stamp duty value. However, the buyer deducts this higher TDS from the actual money paid to the seller, resulting in a lower net payout to the seller. PropTDS automatically detects this and adjusts the net payable figures accurately.
          </p>
        </div>
      </section>

      {/* Pillar 4: Top 3 Traps to Avoid */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          4. Three Critical Traps to Avoid in Joint Property Purchases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-slate-200 bg-white space-y-2">
            <div className="font-bold text-xs text-slate-900">Trap 1: Filing Under Single PAN</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Filing the full 100% TDS under one co-buyer's PAN or against only one seller's PAN causes the other co-owner's AIS (Annual Information Statement) to reflect non-compliance, triggering automated scrutiny notices.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-white space-y-2">
            <div className="font-bold text-xs text-slate-900">Trap 2: Forgetting Form 16B</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every filed Form 26QB generates a separate Form 16B certificate on the TRACES portal. The buyer must download and hand over Form 16B for each co-seller within 15 days of challan processing.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-white space-y-2">
            <div className="font-bold text-xs text-slate-900">Trap 3: Non-Resident Sellers</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Section 194-IA applies exclusively when the seller is an Indian tax resident. If any co-seller is an NRI, their share is subject to Section 195 (requires TAN and 20%+ surcharge rates).
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};
