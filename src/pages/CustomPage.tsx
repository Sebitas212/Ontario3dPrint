import React from 'react';
import { ShieldCheck, Cpu, Layers, FileCode, CheckCircle2, MapPin, Sparkles, HelpCircle } from 'lucide-react';
import { CustomPrintStudio } from '../components/CustomPrintStudio';

export const CustomPage: React.FC = () => {
  const faqs = [
    {
      q: 'What 3D CAD formats do you accept?',
      a: 'We accept .STL, .3MF, .STEP, .STP, and .OBJ. For engineering assemblies and precise mechanical threads, STEP files (.step / .stp) are strongly recommended as they retain true mathematical NURBS curvature.'
    },
    {
      q: 'What is your typical turnaround time in Ontario?',
      a: 'Standard bespoke parts print within 2 to 3 business days following design validation. Express 24-hour turnaround is available for urgent functional prototyping.'
    },
    {
      q: 'What dimensional tolerances can you guarantee?',
      a: 'We achieve ±0.12mm on structural CoreXY FFF composite parts and ±0.05mm on UV engineering resin stereolithography (SLA).'
    },
    {
      q: 'Do you protect intellectual property and CAD models?',
      a: 'Absolutely. We treat all client geometry and CAD files under strict confidential non-disclosure conditions. Your models are never published, shared, or repurposed.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16 md:space-y-24">
      {/* Top Value Intro */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>BESPOKE ADDITIVE ENGINEERING · RAPID TOOLING · ONTARIO</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
          YOUR IDEA.<br />
          OUR TECHNOLOGY.
        </h1>
        <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light">
          Have an idea? Let's bring it to life. We transform your digital 3D models and CAD blueprints into production-grade physical parts with aerospace composite polymers and micrometer precision.
        </p>
      </div>

      {/* Main Interactive CAD Studio */}
      <CustomPrintStudio />

      {/* Technical Fleet & Material Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#0D0F17] border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center mb-4">
            <FileCode className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Automated Slicing & DFM</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Our engineers verify wall thicknesses, overhang angles, support placements, and mechanical stress vector alignments prior to job dispatch.
          </p>
          <span className="text-[11px] font-mono text-cyan-400">STL · 3MF · STEP · OBJ</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0D0F17] border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center mb-4">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Composite Polymers & Resin</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Choose from carbon fiber reinforced PETG-CF, high-heat polycarbonate, ultra-durable nylon PA12, or glass-smooth UV engineering resins.
          </p>
          <span className="text-[11px] font-mono text-cyan-400">Up to 78°C Deflection</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0D0F17] border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Ontario Studio Quality</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Direct communication with local Ontario manufacturing specialists who review and calibrate every production run for critical fit and finish.
          </p>
          <span className="text-[11px] font-mono text-cyan-400">Domestic Canadian Express</span>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="pt-8 border-t border-slate-800">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-8">
          Frequently Asked Questions About Custom Prints
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#0B0D14] border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
