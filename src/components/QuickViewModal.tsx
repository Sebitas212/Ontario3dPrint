import React, { useState } from 'react';
import { X, Star, ShoppingBag, ArrowRight, ShieldCheck, Check, Layers, Cpu } from 'lucide-react';
import { Product, ProductColor, ProductMaterial } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, material: ProductMaterial, quantity: number) => void;
  onViewDetails: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewDetails,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState<ProductMaterial>(product.materials[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const unitPrice = product.priceCAD + selectedMaterial.priceModifierCAD;

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedMaterial, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0D0F17] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700/80"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="p-6 md:p-8 bg-[#08090E] flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-850 mb-4">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-cyan-400 border border-slate-700">
                Layer: {product.layerHeight}
              </div>
            </div>

            {/* Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex gap-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>{product.category}</span>
                <div className="flex items-center gap-1 text-slate-300">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-500">({product.reviewCount})</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                {product.name}
              </h2>

              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  ${unitPrice}.00
                </span>
                <span className="text-xs text-slate-400 font-mono">CAD</span>
                {product.compareAtPriceCAD && (
                  <span className="text-sm text-slate-500 line-through font-mono">
                    ${product.compareAtPriceCAD}.00 CAD
                  </span>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Color Finish: <span className="text-cyan-400 font-normal">{selectedColor.name}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all ${
                        selectedColor.name === c.name
                          ? 'border-cyan-400 bg-slate-900 text-white shadow-md'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span>{c.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selection */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Polymer / Composite Grade
                </label>
                <div className="space-y-1.5">
                  {product.materials.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMaterial(m)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        selectedMaterial.id === m.id
                          ? 'border-cyan-500/60 bg-cyan-950/20 text-white'
                          : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-slate-200">{m.name}</div>
                        <div className="text-[11px] text-slate-500">{m.description}</div>
                      </div>
                      <div className="font-mono text-cyan-400 text-right whitespace-nowrap ml-2">
                        {m.priceModifierCAD > 0 ? `+$${m.priceModifierCAD}.00` : 'Included'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-1 text-slate-400 hover:text-white text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-1 text-slate-400 hover:text-white text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isAdded
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · ${(unitPrice * quantity).toFixed(2)} CAD</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onViewDetails(product);
                }}
                className="w-full py-2.5 text-center text-xs font-medium text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Full Product Specifications & Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
