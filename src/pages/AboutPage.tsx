import React from 'react';
import { ShieldCheck, Cpu, MapPin, Layers, Award, Sparkles, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateCustom: () => void;
  onNavigateShop: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateCustom,
  onNavigateShop,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Brand Hero */}
      <div className="max-w-3xl mb-16 md:mb-24">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4">
          <MapPin className="w-3.5 h-3.5" />
          <span>PROUDLY DESIGNED & ADDITIVE MANUFACTURED IN ONTARIO, CANADA</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
          SMALL DETAILS.<br />
          LIMITLESS POSSIBILITIES.
        </h1>
        <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light">
          At Ontario3Dprint, we believe great ideas deserve to become reality. We combine modern 3D printing technology with thoughtful design to create innovative products that solve problems, inspire creativity, and make everyday life better.
        </p>
      </div>

      {/* Visual Feature Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
        <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl relative aspect-[16/10]">
          <img
            src="/src/assets/images/showcase_custom_prototyping_1792788606505.jpg"
            alt="Ontario3Dprint Additive Manufacturing Facility"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-slate-300">
            <span>Precision Planetary Gearbox · 0.12mm Layer Resolution</span>
            <span className="text-cyan-400">Additive Lab #01</span>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            The Intersection of Additive Technology & Functional Industrial Design
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Conventional manufacturing forces compromises: geometric limitations, excessive tooling overhead, and thousands of identical generic plastic items shipped overseas in cargo containers.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            We operate differently. Every piece produced in our Ontario studio is engineered with generative topological algorithms, optimized for strength-to-weight ratios, and printed to order with carbon-fiber reinforced composites and engineering polymers.
          </p>

          <div className="pt-2 flex gap-4">
            <button
              onClick={onNavigateShop}
              className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
            >
              <span>Explore Our Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateCustom}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Bespoke Custom Prints
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Craftsmanship */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        <div className="p-6 rounded-2xl bg-[#0D0F17] border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Locally Made in Ontario</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every product is designed, sliced, inspected, and shipped directly from Southern Ontario, supporting localized high-tech digital manufacturing.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0D0F17] border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Innovative Product Design</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            From generative Voronoi desk sculptures to parametric helical MagSafe charging geometry, our designs push the frontier of what additive manufacturing can deliver.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0D0F17] border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center mb-4">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Functional & Creative</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We don't print decorative knick-knacks. Every object serves a clear ergonomic, acoustic, or mechanical purpose with real utility in daily workflow.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0D0F17] border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Microscopic Attention</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our 0.12mm precision layer pitch and hardened steel extruders yield micro-textured matte surfaces that feel premium in the hand and stand the test of time.
          </p>
        </div>
      </div>
    </div>
  );
};
