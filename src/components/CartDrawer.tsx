import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotalCAD = items.reduce((sum, item) => {
    const itemUnitPrice = item.product.priceCAD + item.selectedMaterial.priceModifierCAD;
    return sum + itemUnitPrice * item.quantity;
  }, 0);

  const freeShippingThreshold = 75.00;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotalCAD);
  const freeShippingProgress = Math.min(100, (subtotalCAD / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D0F17] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Shopping Bag</h2>
                <span className="text-xs text-slate-400">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} {items.length === 1 && items[0].quantity === 1 ? 'item' : 'items'} · CAD Currency
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3.5 bg-slate-900/60 border-b border-slate-800/80 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                {amountToFreeShipping === 0 ? (
                  <span className="text-cyan-300 font-bold">You unlocked Free Canada-Wide Shipping!</span>
                ) : (
                  <span>Add <strong className="text-cyan-400 font-mono">${amountToFreeShipping.toFixed(2)} CAD</strong> for Free Shipping</span>
                )}
              </span>
              <span className="text-[11px] font-mono text-slate-400">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">Your bag is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  Explore precision engineered 3D printed accessories and bespoke objects ready to ship from Ontario.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemUnitPrice = item.product.priceCAD + item.selectedMaterial.priceModifierCAD;
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-500 hover:text-red-400 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-slate-700"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name.split(' ')[0]}
                        </span>
                        <span>·</span>
                        <span className="truncate">{item.selectedMaterial.name.split(' ')[0]}</span>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        {/* Stepper */}
                        <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-slate-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-slate-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-bold text-white font-mono tabular-nums">
                            ${(itemUnitPrice * item.quantity).toFixed(2)}
                          </span>
                          <span className="text-[10px] text-slate-500 block font-mono">
                            ${itemUnitPrice.toFixed(2)} each
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-[#090A0F]/90 space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold tabular-nums">${subtotalCAD.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Est. Canadian Shipping</span>
                  <span className="text-cyan-400">
                    {subtotalCAD >= freeShippingThreshold ? 'FREE' : '$12.00 CAD'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>HST / GST Calculated at checkout</span>
                  <span>Ontario (13%)</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Encrypted Canadian Checkout
                </span>
                <span>·</span>
                <span>Made in Ontario</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
