import React, { useState } from 'react';
import { Truck, ShieldAlert, FileText, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  initialTab?: 'shipping' | 'privacy' | 'terms';
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  initialTab = 'shipping',
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'privacy' | 'terms'>(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Store</span>
      </button>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-[#0D0F17] border border-slate-800 rounded-2xl mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center justify-center gap-2 ${
            activeTab === 'shipping'
              ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping & Returns</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center justify-center gap-2 ${
            activeTab === 'privacy'
              ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center justify-center gap-2 ${
            activeTab === 'terms'
              ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms & Conditions</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="bg-[#0B0D14] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl text-slate-300 text-sm leading-relaxed space-y-6">
        {activeTab === 'shipping' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">Canadian Shipping & Returns Policy</h1>
            <p className="text-xs font-mono text-cyan-400 mb-6">Last revised: October 2026 · Ontario, Canada</p>

            <div className="space-y-6">
              <section>
                <h2 className="text-base font-bold text-white mb-2">1. Domestic Canadian Shipping</h2>
                <p>All catalog products are dispatched directly from our manufacturing laboratory in Southern Ontario, Canada. Standard tracked orders are shipped via Canada Post Expedited Parcel (3–5 business days) or Xpresspost (1–2 business days). Orders over $75.00 CAD qualify for free standard ground delivery across all Canadian provinces.</p>
              </section>

              <section>
                <h2 className="text-base font-bold text-white mb-2">2. Production & Lead Times</h2>
                <p>Because we prioritize additive precision and zero-defect quality, catalog products typically print within 24 to 48 hours before undergoing manual post-processing, deburring, and optical tolerance inspection. Custom bespoke CAD orders typically require 2 to 4 business days depending on volume and selected composite material.</p>
              </section>

              <section>
                <h2 className="text-base font-bold text-white mb-2">3. 30-Day Fit & Satisfaction Guarantee</h2>
                <p>If your 3D printed accessory does not fit your designated headphone model, desk setup, or device as intended, we will re-slice and reprint a corrected iteration free of charge or provide a full refund within 30 days of confirmed delivery.</p>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">Privacy & Data Governance</h1>
            <p className="text-xs font-mono text-cyan-400 mb-6">Compliant with Canadian PIPEDA Standards</p>

            <div className="space-y-6">
              <section>
                <h2 className="text-base font-bold text-white mb-2">1. Personal Information Collection</h2>
                <p>Ontario3Dprint collects necessary contact and delivery information solely to process orders, generate Canadian courier waybills, and provide customer support. We never sell, rent, or trade customer information to third-party data brokers.</p>
              </section>

              <section>
                <h2 className="text-base font-bold text-white mb-2">2. Proprietary CAD & 3D Model Protection</h2>
                <p>Files uploaded to our Custom 3D Printing Service (.STL, .3MF, .STEP, .OBJ) remain the exclusive intellectual property of the client. Uploaded geometries are stored on secure encrypted servers and deleted following completed manufacturing and client sign-off, unless repeat batch storage is explicitly requested.</p>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-xs font-mono text-cyan-400 mb-6">Ontario, Canada Commercial Additive Manufacturing</p>

            <div className="space-y-6">
              <section>
                <h2 className="text-base font-bold text-white mb-2">1. Additive Manufacturing Tolerances</h2>
                <p>Fused Filament Fabrication (FFF) and SLA resin manufacturing operate within specified dimensional tolerance envelopes of ±0.15mm for standard polymers and ±0.05mm for precision resin. Thermal expansion and anisotropic layer properties are standard characteristics of layered additive manufacturing.</p>
              </section>

              <section>
                <h2 className="text-base font-bold text-white mb-2">2. Pricing & Currency</h2>
                <p>All prices listed on Ontario3Dprint are in Canadian Dollars (CAD). Appropriate provincial sales taxes (HST, GST, PST, QST) are assessed based on the shipping destination provided at checkout in accordance with Canadian tax legislation.</p>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
