import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Box } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'categories', label: 'Categories' },
    { id: 'custom', label: 'Custom Prints' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#08090E]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      {/* Strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element with geometric 3D mark) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Box className="w-5 h-5 text-slate-950" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white font-['Outfit']">
            ONTARIO<span className="text-cyan-400">3D</span>PRINT
          </span>
        </button>

        {/* Zone 2: 4–5 Nav Links, single-line, clean typography */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.slice(1).map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
                activePage === link.id ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {link.label}
              {activePage === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action (Shopping Bag Toggle with Badge) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="Open shopping bag"
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white transition-all flex items-center gap-2 group cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs font-semibold font-mono text-slate-300">
              Bag
            </span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-black flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0C14] border-b border-slate-800 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left py-2 text-sm font-medium ${
                activePage === link.id ? 'text-cyan-400 font-bold' : 'text-slate-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
