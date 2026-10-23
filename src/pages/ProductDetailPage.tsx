import React, { useState } from 'react';
import { 
  Star, ShoppingBag, ShieldCheck, Truck, Clock, 
  Layers, Cpu, Ruler, Weight, ArrowLeft, Check, Sparkles, MapPin, Share2 
} from 'lucide-react';
import { Product, ProductColor, ProductMaterial } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBackToShop: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, material: ProductMaterial, quantity: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBackToShop,
  onSelectProduct,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState<ProductMaterial>(product.materials[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState<string | null>(null);

  const unitPrice = product.priceCAD + selectedMaterial.priceModifierCAD;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedMaterial, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (postalCode.trim().length >= 3) {
      setEstimatedDelivery('Estimated arrival: 2–3 business days via Canada Post Expedited');
    }
  };

  // Related products from same category
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb Back Action */}
      <button
        onClick={onBackToShop}
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalog</span>
      </button>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#0A0C14] border border-slate-800 shadow-2xl">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Origin & Specs Ribbon */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Made in Ontario, Canada</span>
            </div>

            <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-cyan-400">
              Layer Resolution: {product.layerHeight}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  selectedImage === img
                    ? 'border-cyan-400 ring-2 ring-cyan-500/20 scale-102'
                    : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Angle ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          {/* Additive Manufacturing Technical Blueprint */}
          <div className="mt-8 p-6 bg-[#0B0D14] rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Manufacturing & Additive Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-1">Dimensions</span>
                <span className="text-slate-200 font-bold">{product.dimensions.display}</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-1">Mass / Weight</span>
                <span className="text-slate-200 font-bold">{product.weightGrams}g</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-1">Infill Density</span>
                <span className="text-slate-200 font-bold">{product.infillDensity}</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-1">Print Duration</span>
                <span className="text-slate-200 font-bold">{product.printDurationHours} hours</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-1">Layer Pitch</span>
                <span className="text-cyan-300 font-bold">{product.layerHeight}</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-1">Lead Time</span>
                <span className="text-slate-200 font-bold">{product.leadTimeDays} business days</span>
              </div>
            </div>

            {/* Additional Spec Table */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
              {Object.entries(product.technicalSpecs).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1">
                  <span className="text-slate-400">{key}:</span>
                  <span className="text-slate-200 font-medium font-mono">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Purchase Module (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-[#0D0F17] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            {/* Category & Status */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="uppercase tracking-wider text-cyan-400">{product.category}</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                In Stock · Ready to Print
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              {product.name}
            </h1>

            {/* Star Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono text-slate-300 font-bold">{product.rating}</span>
              <span className="text-xs text-slate-500">({product.reviewCount} verified Canadian reviews)</span>
            </div>

            {/* Price in CAD */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white font-mono tabular-nums">
                  ${unitPrice}.00
                </span>
                <span className="text-sm font-mono text-slate-400">CAD</span>
                {product.compareAtPriceCAD && (
                  <span className="text-sm text-slate-500 line-through font-mono">
                    ${product.compareAtPriceCAD + selectedMaterial.priceModifierCAD}.00 CAD
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                Prices in Canadian Dollars (CAD) · Taxes calculated at checkout
              </div>
            </div>

            {/* Color Swatch Selection */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2.5">
                <span>Finish / Color:</span>
                <span className="text-cyan-400 font-mono">{selectedColor.name}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                      selectedColor.name === c.name
                        ? 'border-cyan-400 bg-slate-800 text-white shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-700"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Material Grade Selection */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Engineering Material Grade
              </label>
              <div className="space-y-2">
                {product.materials.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMaterial(m)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      selectedMaterial.id === m.id
                        ? 'border-cyan-500 bg-cyan-950/20 text-white'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-200 flex items-center gap-2">
                        <span>{m.name}</span>
                        {m.badge && (
                          <span className="text-[10px] bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 rounded px-1.5 py-0.5">
                            {m.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{m.description}</div>
                    </div>
                    <div className="font-mono text-cyan-400 text-right shrink-0 ml-3">
                      {m.priceModifierCAD > 0 ? `+$${m.priceModifierCAD}.00` : 'Included'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Primary Action */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 px-2 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-mono font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25'
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
                      <span>ADD TO BAG · ${totalPrice.toFixed(2)} CAD</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Canadian Shipping Postal Code Checker */}
            <div className="mt-6 pt-6 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block mb-2 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                Estimate Canadian Delivery Time
              </span>
              <form onSubmit={handleCalculateShipping} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Postal Code (e.g. M5V 2T6)"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                  maxLength={7}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-mono uppercase focus:border-cyan-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors"
                >
                  Calculate
                </button>
              </form>
              {estimatedDelivery && (
                <div className="text-[11px] font-mono text-cyan-300 mt-2">
                  {estimatedDelivery}
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>30-Day Fit Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ontario Studio Craftsmanship</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Engineering Highlights */}
      <div className="max-w-4xl mb-20 space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Engineering & Design Narrative
        </h2>
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          {product.fullDescription.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Feature List */}
        <div className="pt-4">
          <h3 className="text-base font-bold text-white mb-3">Key Performance Highlights</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">More From This Category</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Related 3D Printed Solutions</h2>
            </div>
            <button
              onClick={onBackToShop}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              View All Products →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelectProduct={onSelectProduct}
                onQuickView={onQuickView}
                onAddToCart={(p, c) => onAddToCart(p, c, p.materials[0], 1)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
