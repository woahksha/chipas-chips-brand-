import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { WhereToBuyPage } from './pages/WhereToBuyPage';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CookieModal } from './components/CookieModal';
import { LegalModal, LegalModalType } from './components/LegalModals';
import { ContactModal } from './components/ContactModal';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'about' | 'where-to-buy'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);

  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chipas_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('chipas_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Add to cart handler
  const handleAddToCart = (product: Product, size: string, price: number, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedSize: size, price, quantity }];
      }
    });
  };

  // Quick add from card (adds default 60g pack)
  const handleQuickAdd = (product: Product) => {
    const defaultPack = product.sizes[1] || product.sizes[0];
    handleAddToCart(product, defaultPack.weight, defaultPack.price, 1);
    setCartDrawerOpen(true);
    try {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#FBBF24', '#8B1E29']
      });
    } catch (e) {
      // ignore
    }
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (page: 'home' | 'products' | 'about' | 'where-to-buy') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#1E1B18] font-sans selection:bg-[#E63946] selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Main Content Area with clearance for sticky nav & promo strip */}
      <main className="flex-1 pt-24 md:pt-28">
        {currentPage === 'home' && (
          <HomePage
            onSelectProduct={(p) => setSelectedProduct(p)}
            onQuickAdd={handleQuickAdd}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onSelectProduct={(p) => setSelectedProduct(p)}
            onQuickAdd={handleQuickAdd}
            onNavigateToWhereToBuy={() => handleNavigate('where-to-buy')}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigateToProducts={() => handleNavigate('products')}
          />
        )}

        {currentPage === 'where-to-buy' && (
          <WhereToBuyPage
            onOpenContact={() => setContactModalOpen(true)}
          />
        )}
      </main>

      {/* Global Burgundy Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenCookies={() => setCookieModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onNavigateToWhereToBuy={() => {
          setSelectedProduct(null);
          handleNavigate('where-to-buy');
        }}
      />

      {/* Slide-Over Bag Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onExploreFlavours={() => {
          setCartDrawerOpen(false);
          handleNavigate('products');
        }}
      />

      {/* Cookie Consent Modal */}
      <CookieModal
        isOpen={cookieModalOpen}
        onClose={() => setCookieModalOpen(false)}
      />

      {/* Legal & Policy Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

    </div>
  );
}
