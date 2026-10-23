import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomPage } from './pages/CustomPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LegalPage } from './pages/LegalPage';
import { PRODUCTS } from './data/products';
import { Product, ProductColor, ProductMaterial, CartItem, ProductCategory } from './types';
import { Truck, X } from 'lucide-react';

export default function App() {
  // Navigation & Page State
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [legalTab, setLegalTab] = useState<'shipping' | 'privacy' | 'terms'>('shipping');

  // Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ontario3dprint_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ontario3dprint_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to sync cart:', err);
    }
  }, [cartItems]);

  // Scroll to top on page change
  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    color: ProductColor,
    material: ProductMaterial = product.materials[0],
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      // Check if identical variant already exists in cart
      const existingIdx = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedMaterial.id === material.id
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${color.name}-${material.id}-${Date.now()}`,
          productId: product.id,
          product,
          selectedColor: color,
          selectedMaterial: material,
          quantity,
          addedAt: Date.now(),
        };
        return [...prev, newItem];
      }
    });

    // Auto-open cart feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Navigate to PDP
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  // Navigate to category from Categories page
  const handleSelectCategoryFromList = (category: ProductCategory) => {
    setSelectedCategory(category);
    navigateTo('shop');
  };

  // Navigate to legal page
  const handleNavigateLegal = (tab: 'shipping' | 'privacy' | 'terms') => {
    setLegalTab(tab);
    navigateTo('legal');
  };

  return (
    <div className="min-h-screen bg-[#08090E] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Slim Dismissible Top Notification Banner */}
      {showPromoBanner && (
        <div className="bg-slate-900/90 border-b border-slate-800 text-[11px] text-slate-300 py-1.5 px-4 flex items-center justify-between font-mono">
          <div className="max-w-7xl mx-auto flex items-center gap-2 truncate">
            <Truck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">
              Free Tracked Canadian Shipping On Orders Over $75 CAD · Engineered in Ontario
            </span>
          </div>
          <button
            onClick={() => setShowPromoBanner(false)}
            className="text-slate-500 hover:text-white p-0.5 ml-2"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Navigation Bar following 3-Zone Contract */}
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            products={PRODUCTS}
            onNavigateShop={() => navigateTo('shop')}
            onNavigateCustom={() => navigateTo('custom')}
            onNavigateAbout={() => navigateTo('about')}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'categories' && (
          <CategoriesPage
            products={PRODUCTS}
            onSelectCategory={handleSelectCategoryFromList}
          />
        )}

        {activePage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            onBackToShop={() => navigateTo('shop')}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'custom' && <CustomPage />}

        {activePage === 'about' && (
          <AboutPage
            onNavigateShop={() => navigateTo('shop')}
            onNavigateCustom={() => navigateTo('custom')}
          />
        )}

        {activePage === 'contact' && <ContactPage />}

        {activePage === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            onBackToCart={() => setIsCartOpen(true)}
            onClearCart={handleClearCart}
          />
        )}

        {activePage === 'legal' && (
          <LegalPage
            initialTab={legalTab}
            onBack={() => navigateTo('shop')}
          />
        )}
      </main>

      {/* Global Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => navigateTo('checkout')}
      />

      {/* Global Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewDetails={handleSelectProduct}
      />

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onNavigateLegal={handleNavigateLegal}
      />
    </div>
  );
}
