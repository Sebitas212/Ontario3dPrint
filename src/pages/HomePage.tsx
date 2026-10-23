import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Cpu, Layers, Sparkles, ChevronDown, 
  MapPin, Clock, Box, Star, CheckCircle2 
} from 'lucide-react';
import { Product, ProductCategory, ProductColor, ProductMaterial } from '../types';
import { ThreeProductViewer } from '../components/ThreeProductViewer';
import { ProductCard } from '../components/ProductCard';
import { CustomPrintStudio } from '../components/CustomPrintStudio';

interface HomePageProps {
  products: Product[];
  onNavigateShop: () => void;
  onNavigateCustom: () => void;
  onNavigateAbout: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, material: ProductMaterial, quantity: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onNavigateShop,
  onNavigateCustom,
  onNavigateAbout,
  onSelectProduct,
  onQuickView,
  onAddToCart,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [activeHeroColor, setActiveHeroColor] = useState<string>('#14161C');

  // Filtered showcase products
  const showcaseCategories = ['All', 'Desk & Workspace', 'Phone & Tech Accessories', 'Everyday Carry', 'Custom 3D Prints'];
  const displayedProducts = products.filter((p) => {
    if (activeCategoryFilter === 'All') return true;
    return p.category === activeCategoryFilter;
  }).slice(0, 6);

  return (
    <div className="space-y-24 md:space-y-36">
      {/* 1. HERO SECTION: THE WOW FACTOR */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center pt-8 pb-16 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & High-Impact Copy (6 cols) */}
            <div className="lg:col-span-6 space-y-6 z-10">
              {/* Origin Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-400 shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>PRECISION ADDITIVE MANUFACTURING · ONTARIO, CANADA</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
                DESIGNED TO IMPRESS.<br />
                <span className="text-gradient-cyan">
                  PRINTED TO PERFORM.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
                Discover innovative 3D printed products designed to transform everyday life. Precision, creativity, and technology — made in Ontario.
              </p>

              {/* CTA Action Cluster */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onNavigateShop}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <span>EXPLORE PRODUCTS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onNavigateCustom}
                  className="px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-500 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
                >
                  <span>REQUEST A CUSTOM DESIGN</span>
                </button>
              </div>

              {/* Trust & Spec Markers */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                <div>
                  <span className="text-white font-bold block text-sm">0.12mm</span>
                  <span>Layer Precision</span>
                </div>
                <div>
                  <span className="text-white font-bold block text-sm">Carbon-CF</span>
                  <span>Composite Polymers</span>
                </div>
                <div>
                  <span className="text-white font-bold block text-sm">100% Made</span>
                  <span>In Ontario, Canada</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Product Visualizer Canvas (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square">
                {/* 3D WebGL Three.js Visualizer */}
                <ThreeProductViewer initialColor={activeHeroColor} className="w-full h-full shadow-2xl" />

                {/* Floating Product Badge */}
                <div className="absolute -bottom-4 right-4 hidden sm:flex items-center gap-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                    <img
                      src="/src/assets/images/hero_3d_product_cinematic_1792788604738.jpg"
                      alt="Vortex Apex"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Vortex Apex Headphone Stand</h4>
                    <span className="text-[11px] font-mono text-cyan-400">$68.00 CAD · Generative Voronoi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="w-full flex justify-center pt-12">
          <a
            href="#featured-catalog"
            className="flex flex-col items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors font-mono"
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* 2. CINEMATIC PRODUCT SHOWCASE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0B0D14] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px]">
              <img
                src="/src/assets/images/hero_3d_product_cinematic_1792788604738.jpg"
                alt="Vortex Apex Pro Headphone Stand"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0D14]/90 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-transparent to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center space-y-5">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                FEATURED ARCHITECTURAL DROP
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Vortex Apex Parametric Headphone Stand
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Engineered with generative cellular algorithms inspired by bone microstructure. Eliminates 42% of unnecessary material while maintaining rock-solid acoustic rigidity for audiophile headphones.
              </p>

              <div className="space-y-2 py-2 text-xs font-mono text-slate-400">
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span>Layer Pitch:</span>
                  <span className="text-white">0.12mm Ultra-Fine</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span>Reinforcement:</span>
                  <span className="text-cyan-300">Continuous Carbon Fiber</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="text-white font-bold">$68.00 CAD</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => {
                    const heroProd = products.find((p) => p.id === 'vortex-apex-headphone-stand');
                    if (heroProd) onSelectProduct(heroProd);
                  }}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-2"
                >
                  <span>View Product Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG SHOWCASE GRID */}
      <section id="featured-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              CATALOGUE CURATION · MADE IN ONTARIO
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Engineered For The Everyday
            </h2>
          </div>

          {/* Category Filter Buttons (Functional Segmented Tabs) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            {showcaseCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeCategoryFilter === cat
                    ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {displayedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={onSelectProduct}
              onQuickView={onQuickView}
              onAddToCart={(prod, col) => onAddToCart(prod, col, prod.materials[0], 1)}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onNavigateShop}
            className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2"
          >
            <span>VIEW COMPLETE CATALOGUE (8 PRODUCTS)</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </section>

      {/* 4. CUSTOM 3D PRINTING SERVICE SECTION */}
      <section id="custom-service" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomPrintStudio />
      </section>

      {/* 5. BRAND STORY: "SMALL DETAILS. LIMITLESS POSSIBILITIES." */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B0D14] border border-slate-800 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#141724_1px,transparent_1px),linear-gradient(to_bottom,#141724_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />

          <div className="relative max-w-3xl space-y-6">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              THE ONTARIO3DPRINT PHILOSOPHY
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              SMALL DETAILS.<br />
              LIMITLESS POSSIBILITIES.
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">
              At Ontario3Dprint, we believe great ideas deserve to become reality. We combine modern 3D printing technology with thoughtful design to create innovative products that solve problems, inspire creativity, and make everyday life better.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs text-slate-400">
              <div className="space-y-1.5">
                <strong className="text-white block text-sm">Locally Made in Ontario</strong>
                <p>Designed, sliced, manufactured, and inspected right here in Ontario, Canada with high-speed CoreXY kinematic printers.</p>
              </div>
              <div className="space-y-1.5">
                <strong className="text-white block text-sm">Industrial Composite Materials</strong>
                <p>Carbon-fiber reinforced PETG-CF, high-heat polycarbonate, and tough engineering SLA resins built for actual load-bearing use.</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onNavigateAbout}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Read our full manufacturing story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
