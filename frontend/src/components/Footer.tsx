import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'sole-street');

  return (
    <footer className="bg-foreground text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/assets/generated/logo-icon.dim_128x128.png"
                alt="Sole Street"
                className="w-8 h-8 object-contain brightness-0 invert"
              />
              <span className="font-display text-lg font-800 tracking-tight">
                SOLE<span className="text-accent">STREET</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              Premium footwear for every step of your journey. Quality craftsmanship, modern style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-700 text-sm uppercase tracking-widest mb-4 text-primary-foreground/80">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'About Us', to: '/about' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-700 text-sm uppercase tracking-widest mb-4 text-primary-foreground/80">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>123 Fashion Ave, New York, NY 10001</li>
              <li>+1 (212) 555-0147</li>
              <li>hello@solestreet.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/40">
            © {year} Sole Street. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/40 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 fill-accent text-accent" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
