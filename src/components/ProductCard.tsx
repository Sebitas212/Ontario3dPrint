import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Layers, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative bg-[#0C0E15] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/20"
    >
      {/* Top Image Frame */}
      <div className="relative aspect-[4/3] w-full bg-[#07080D] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Ambient Top Shadow Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E15] via-transparent to-transparent opacity-80" />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px]">
          <button
            onClick={handleQuickViewClick}
            className="px-4 py-2 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xl transition-all hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            Quick View
          </button>
        </div>

        {/* Lead Tag / Origin Marker */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800">
          <span>ON, CA</span>
          <span className="text-slate-600">/</span>
          <span className="text-cyan-400">{product.layerHeight.split(' ')[0]}</span>
        </div>

        {/* Review rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-md border border-slate-800">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="tabular-nums">{product.rating}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category kicker */}
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1.5">
            {product.name}
          </h3>

          {/* Short tagline */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {product.tagline}
          </p>
        </div>

        <div>
          {/* Color Swatch Picker */}
          <div className="flex items-center justify-between py-2 border-t border-slate-800/80 mb-3.5">
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 4).map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c);
                  }}
                  title={c.name}
                  className={`w-4 h-4 rounded-full transition-all border ${
                    selectedColor.name === c.name
                      ? 'border-cyan-400 ring-2 ring-cyan-400/30 scale-110'
                      : 'border-slate-700 hover:border-slate-500'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-slate-500 font-mono">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>

            <span className="text-[11px] text-slate-400 font-mono truncate max-w-[130px]">
              {selectedColor.name.split(' ')[0]}
            </span>
          </div>

          {/* Price & Add to Cart Action */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-white font-mono tabular-nums">
                  ${product.priceCAD}.00
                </span>
                <span className="text-[11px] text-slate-500 font-mono">CAD</span>
              </div>
              {product.compareAtPriceCAD && (
                <span className="text-xs text-slate-500 line-through font-mono">
                  ${product.compareAtPriceCAD}.00
                </span>
              )}
            </div>

            <button
              onClick={handleQuickAdd}
              className={`p-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
                isAdded
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-cyan-400'
              }`}
              title="Add to shopping bag"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
