import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import CartDrawer from './CartDrawer';

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'About', to: '/about' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/assets/generated/logo-icon.dim_128x128.png"
                alt="Sole Street Logo"
                className="w-9 h-9 object-contain"
              />
              <span className="font-display text-xl font-800 tracking-tight text-foreground">
                SOLE<span className="text-accent">STREET</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-sm font-500 text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                  activeProps={{ className: 'text-foreground' }}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-200" />
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-700 font-display rounded-full w-5 h-5 flex items-center justify-center leading-none">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-sm font-500 text-muted-foreground hover:text-foreground hover:bg-secondary px-3 py-2.5 rounded-md transition-colors"
                  onClick={() => setMobileOpen(false)}
                  activeProps={{ className: 'text-foreground bg-secondary' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
