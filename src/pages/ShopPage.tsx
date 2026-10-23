import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { Product, ProductCategory, ProductColor, ProductMaterial } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, material: ProductMaterial, quantity: number) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onQuickView,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState('all');

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'All Products' && p.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesTag = p.tagline.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag && !matchesCat) return false;
      }
      // Material filter
      if (selectedMaterialFilter !== 'all') {
        const hasMat = p.materials.some((m) => m.id === selectedMaterialFilter);
        if (!hasMat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceCAD - b.priceCAD;
      if (sortBy === 'price-desc') return b.priceCAD - a.priceCAD;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, searchQuery, sortBy, selectedMaterialFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Title & Subtitle */}
      <div className="mb-8">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          ONTARIO CATALOGUE · ALL PRICES IN CAD
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
          Innovative 3D Printed Products
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Explore our collection of generative desk accessories, everyday carry organizers, and functional industrial designs manufactured with 120-micron additive precision in Ontario.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#0B0D14] border border-slate-800 rounded-2xl p-4 mb-8 space-y-4 shadow-xl">
        {/* Row 1: Search & Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search products by name, specs, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl pl-10 pr-8 py-2.5 text-xs focus:border-cyan-500 focus:outline-none placeholder-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & Material Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <select
              value={selectedMaterialFilter}
              onChange={(e) => setSelectedMaterialFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Materials</option>
              <option value="petg-cf">Carbon Fiber (PETG-CF)</option>
              <option value="matte-pla-pro">Matte PLA Pro</option>
              <option value="tough-resin">Engineering Resin</option>
            </select>
          </div>
        </div>

        {/* Row 2: Categories Horizontal Segmented Controls (functional interactive buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-slate-800/80">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-6 font-mono">
        <div>
          Showing <span className="text-white font-bold tabular-nums">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
          {selectedCategory !== 'All Products' && (
            <span> in <span className="text-cyan-400">{selectedCategory}</span></span>
          )}
        </div>
        <div className="hidden sm:block">
          All orders qualify for Canada-wide tracked delivery
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#0D0F17] border border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto my-12">
          <Search className="w-10 h-10 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No matching products found</h3>
          <p className="text-xs text-slate-400 mb-6">
            We couldn't find any products matching your current filters. Try searching for other terms or reset your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('All Products');
              setSelectedMaterialFilter('all');
            }}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={onSelectProduct}
              onQuickView={onQuickView}
              onAddToCart={(prod, col) => onAddToCart(prod, col, prod.materials[0], 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
