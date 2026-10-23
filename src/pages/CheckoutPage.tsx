import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, Truck, CreditCard, CheckCircle2, Lock, Tag, MapPin, Printer } from 'lucide-react';
import { CartItem, ShippingRate } from '../types';
import { CANADIAN_PROVINCES, SHIPPING_RATES } from '../data/products';

interface CheckoutPageProps {
  items: CartItem[];
  onBackToCart: () => void;
  onClearCart: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onBackToCart,
  onClearCart,
}) => {
  // Customer details
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [provinceCode, setProvinceCode] = useState('ON'); // Default to Ontario
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  // Shipping & Payment selection
  const [selectedShippingId, setSelectedShippingId] = useState('standard-cp');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'interac'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Submission state
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    totalCAD: number;
    provinceName: string;
    shippingName: string;
    date: string;
  } | null>(null);

  // Calculations
  const subtotalCAD = items.reduce((sum, item) => {
    const itemPrice = item.product.priceCAD + item.selectedMaterial.priceModifierCAD;
    return sum + itemPrice * item.quantity;
  }, 0);

  const selectedProvince = CANADIAN_PROVINCES.find((p) => p.code === provinceCode) || CANADIAN_PROVINCES[0];
  const selectedShipping = SHIPPING_RATES.find((s) => s.id === selectedShippingId) || SHIPPING_RATES[0];

  const effectiveShippingCost = subtotalCAD >= 75 && selectedShipping.id === 'standard-cp' ? 0 : selectedShipping.costCAD;
  const discountAmount = subtotalCAD * appliedDiscount;
  const taxableAmount = Math.max(0, subtotalCAD - discountAmount + effectiveShippingCost);
  const taxCAD = Number((taxableAmount * selectedProvince.rate).toFixed(2));
  const totalCAD = Number((taxableAmount + taxCAD).toFixed(2));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ONTARIO10') {
      setAppliedDiscount(0.10);
      setPromoMessage('Promo code ONTARIO10 applied: 10% discount!');
    } else if (promoCode.trim().toUpperCase() === 'MADEINCANADA') {
      setAppliedDiscount(0.15);
      setPromoMessage('Promo code MADEINCANADA applied: 15% discount!');
    } else {
      setPromoMessage('Invalid promo code. Try ONTARIO10 for 10% off.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `ONT-CAD-${Math.floor(100000 + Math.random() * 900000)}`;
      setCompletedOrder({
        orderId: orderNumber,
        totalCAD,
        provinceName: selectedProvince.name,
        shippingName: selectedShipping.name,
        date: new Date().toLocaleDateString('en-CA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });
      setIsProcessing(false);
      onClearCart();
    }, 1200);
  };

  // Order Receipt State
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-[#0D0F17] border border-cyan-500/30 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
          <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            ORDER CONFIRMED · {completedOrder.orderId}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Thank you for your order!
          </h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed mb-8">
            Your high-precision 3D printed items are queued for production in our Ontario lab. A tracking email with real-time manufacturing telemetry will be sent to <span className="text-cyan-300 font-semibold">{email || 'your email'}</span>.
          </p>

          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 text-left mb-8 space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-3">
              <span className="text-slate-500">Order Reference:</span>
              <span className="text-white font-bold">{completedOrder.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Charged:</span>
              <span className="text-cyan-400 font-bold">${completedOrder.totalCAD.toFixed(2)} CAD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Shipping Destination:</span>
              <span>{city || 'Toronto'}, {completedOrder.provinceName}, Canada</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Carrier Service:</span>
              <span>{completedOrder.shippingName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Est. Dispatch Date:</span>
              <span>Within 48 hours</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>
            <button
              onClick={onBackToCart}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
            >
              Continue Exploring Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <button
        onClick={onBackToCart}
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Shopping Bag</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Checkout Form (7 cols) */}
        <form onSubmit={handleCompleteOrder} className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact */}
          <div className="bg-[#0B0D14] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span>1. Contact Information</span>
              <span className="text-xs font-mono text-cyan-400">Step 1 of 3</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address (for order tracking) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.ca"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone Number (for courier updates) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(416) 555-0123"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Canadian Shipping Address */}
          <div className="bg-[#0B0D14] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span>2. Canadian Shipping Address</span>
              <span className="text-xs font-mono text-cyan-400">Step 2 of 3</span>
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Vance"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="120 King Street West"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Apartment, suite, unit (optional)
                </label>
                <input
                  type="text"
                  placeholder="Suite 400"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Toronto"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Province / Territory *
                  </label>
                  <select
                    value={provinceCode}
                    onChange={(e) => setProvinceCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    {CANADIAN_PROVINCES.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.name} ({p.taxName} {Math.round(p.rate * 100)}%)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="M5H 3X6"
                    maxLength={7}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs font-mono uppercase focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Carrier Methods */}
            <div className="mt-6 pt-6 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block mb-3">
                Shipping Carrier & Service:
              </span>
              <div className="space-y-2">
                {SHIPPING_RATES.map((rate) => {
                  const isFree = subtotalCAD >= 75 && rate.id === 'standard-cp';
                  return (
                    <label
                      key={rate.id}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedShippingId === rate.id
                          ? 'border-cyan-500 bg-cyan-950/20 text-white'
                          : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={selectedShippingId === rate.id}
                          onChange={() => setSelectedShippingId(rate.id)}
                          className="accent-cyan-400"
                        />
                        <div>
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>{rate.name}</span>
                            <span className="text-[11px] text-slate-500 font-mono">({rate.estimatedDays})</span>
                          </div>
                          <div className="text-[11px] text-slate-500">{rate.description}</div>
                        </div>
                      </div>
                      <div className="font-mono text-cyan-400 font-bold whitespace-nowrap ml-3">
                        {isFree ? 'FREE' : `$${rate.costCAD.toFixed(2)} CAD`}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Payment */}
          <div className="bg-[#0B0D14] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span>3. Payment & Settlement</span>
              <span className="text-xs font-mono text-cyan-400">Step 3 of 3</span>
            </h2>

            {/* Payment Method Switcher */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-cyan-400 bg-slate-800 text-white shadow-md'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>Credit / Debit Card</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('interac')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'interac'
                    ? 'border-cyan-400 bg-slate-800 text-white shadow-md'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                <span>🇨🇦 Interac e-Transfer</span>
              </button>
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4500 •••• •••• 1290"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM / YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Security Code (CVC) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="•••"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-white">Direct Interac e-Transfer Instructions:</p>
                <p>Transfer will be dispatched to: <span className="font-mono text-cyan-400">payments@ontario3dprint.ca</span></p>
                <p>Auto-deposit enabled. Please include your order reference number once placed.</p>
              </div>
            )}

            {/* Place Order CTA */}
            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isProcessing ? 'Authorizing Canadian Payment...' : `AUTHORIZE & PLACE ORDER · $${totalCAD.toFixed(2)} CAD`}
                </span>
              </button>
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>256-Bit SSL Encrypted Canadian Banking Standard</span>
              </div>
            </div>
          </div>
        </form>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5 bg-[#0D0F17] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-white mb-4 pb-3 border-b border-slate-800">
            Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h2>

          {/* Itemized Items */}
          <div className="max-h-80 overflow-y-auto space-y-3 pr-1 mb-6">
            {items.map((item) => {
              const itemUnitPrice = item.product.priceCAD + item.selectedMaterial.priceModifierCAD;
              return (
                <div key={item.id} className="flex gap-3 text-xs py-2 border-b border-slate-800/60 last:border-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">{item.product.name}</h4>
                    <div className="text-[11px] text-slate-400">
                      {item.selectedColor.name.split(' ')[0]} · {item.selectedMaterial.name.split(' ')[0]}
                    </div>
                    <div className="text-slate-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-right font-mono font-bold text-white tabular-nums">
                    ${(itemUnitPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Promo Code Input */}
          <form onSubmit={handleApplyPromo} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Discount code (try ONTARIO10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-mono uppercase focus:border-cyan-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl shrink-0 transition-colors"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className={`text-[11px] mt-2 font-mono ${appliedDiscount > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {promoMessage}
              </p>
            )}
          </form>

          {/* Cost Breakdown */}
          <div className="space-y-2 text-xs font-mono pt-4 border-t border-slate-800">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-white font-bold tabular-nums">${subtotalCAD.toFixed(2)} CAD</span>
            </div>

            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount ({appliedDiscount * 100}%)</span>
                <span>-${discountAmount.toFixed(2)} CAD</span>
              </div>
            )}

            <div className="flex justify-between text-slate-400">
              <span>Shipping ({selectedShipping.carrier})</span>
              <span className="text-cyan-400">
                {effectiveShippingCost === 0 ? 'FREE' : `$${effectiveShippingCost.toFixed(2)} CAD`}
              </span>
            </div>

            <div className="flex justify-between text-slate-400">
              <span>
                {selectedProvince.name} {selectedProvince.taxName} ({(selectedProvince.rate * 100).toFixed(1)}%)
              </span>
              <span className="text-white tabular-nums">${taxCAD.toFixed(2)} CAD</span>
            </div>

            <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-slate-800">
              <span>Total CAD</span>
              <span className="text-cyan-400 text-xl font-mono tabular-nums">${totalCAD.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
