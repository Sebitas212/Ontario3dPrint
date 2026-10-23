import React, { useState } from 'react';
import { Box, MapPin, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onNavigateLegal: (tab: 'shipping' | 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onNavigateLegal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 2500);
    }
  };

  return (
    <footer className="bg-[#06070B] border-t border-slate-850 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Origin (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black">
                <Box className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white font-['Outfit']">
                ONTARIO<span className="text-cyan-400">3D</span>PRINT
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Precision additive manufacturing, generative desk accessories, and bespoke functional engineering solutions designed and fabricated in Ontario, Canada.
            </p>

            <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Greater Toronto Area · Ontario, Canada</span>
            </div>
          </div>

          {/* Col 2: Store Catalog */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Desk & Workspace
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Everyday Carry (EDC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Phone & Tech Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom')}
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors text-left"
                >
                  Custom 3D Printing Service
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Policies */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  About Ontario3Dprint
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateLegal('shipping')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateLegal('privacy')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateLegal('terms')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Product Releases
            </h3>
            <p className="text-slate-400 text-xs">
              Receive notifications for limited filament drops, new CAD models, and additive engineering updates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@domain.ca"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-xs focus:border-cyan-500 focus:outline-none placeholder-slate-500 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed to Ontario3Dprint releases</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Canadian currency assurance */}
        <div className="mt-14 pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Ontario3Dprint. All rights reserved. Built & Engineered in Ontario, Canada.
          </div>
          <div className="flex items-center gap-4 font-mono">
            <span>Prices displayed in CAD ($)</span>
            <span>·</span>
            <span>Canada Post & Interac Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
