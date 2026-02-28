import { Link } from '@tanstack/react-router';
import { ArrowRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/ProductCard';
import { useGetAllShoes } from '@/hooks/useQueries';

const CATEGORIES = [
  { label: 'Men', image: '/assets/generated/product-mens-sneaker.dim_600x600.png', category: 'Men' },
  { label: 'Women', image: '/assets/generated/product-womens-boot.dim_600x600.png', category: 'Women' },
  { label: 'Kids', image: '/assets/generated/product-kids-sneaker.dim_600x600.png', category: 'Kids' },
  { label: 'Casual', image: '/assets/generated/product-casual-loafer.dim_600x600.png', category: 'Casual' },
];

const PERKS = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $75' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
  { icon: Star, title: 'Premium Quality', desc: 'Curated selection' },
];

export default function Home() {
  const { data: shoes, isLoading } = useGetAllShoes();
  const featured = shoes?.slice(0, 6) ?? [];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '520px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/hero-banner.dim_1440x600.png')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/50" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[520px]">
          <div className="max-w-xl animate-fade-in">
            <span className="inline-block font-display font-700 text-xs uppercase tracking-[0.2em] text-accent mb-4 bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
              New Collection 2026
            </span>
            <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl text-primary-foreground leading-[0.95] mb-6">
              Step Into
              <br />
              <span className="text-accent">Style.</span>
            </h1>
            <p className="font-body text-base sm:text-lg text-primary-foreground/75 mb-8 leading-relaxed max-w-md">
              Discover premium footwear crafted for every occasion. From athletic performance to everyday elegance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-700 text-base h-12 px-8 rounded-full"
              >
                <Link to="/products" search={{}}>
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-display font-700 text-base h-12 px-8 rounded-full bg-transparent"
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Perks Bar */}
      <section className="bg-foreground text-primary-foreground py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-display font-700 text-sm">{title}</p>
                  <p className="text-xs text-primary-foreground/50 font-body">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-display font-700 text-xs uppercase tracking-[0.2em] text-accent mb-2">Browse</p>
            <h2 className="font-display font-800 text-3xl sm:text-4xl text-foreground">Shop by Category</h2>
          </div>
          <Link
            to="/products"
            search={{}}
            className="hidden sm:flex items-center gap-1 text-sm font-display font-600 text-muted-foreground hover:text-accent transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.category}
              to="/products"
              search={{ category: cat.category }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-display font-800 text-lg text-primary-foreground">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-display font-700 text-xs uppercase tracking-[0.2em] text-accent mb-2">Handpicked</p>
              <h2 className="font-display font-800 text-3xl sm:text-4xl text-foreground">Featured Products</h2>
            </div>
            <Link
              to="/products"
              search={{}}
              className="hidden sm:flex items-center gap-1 text-sm font-display font-600 text-muted-foreground hover:text-accent transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden shadow-card">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-6 w-1/3 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-display font-700 text-xl text-muted-foreground">No products available yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for our latest collection!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(shoe => (
                <ProductCard key={shoe.id} shoe={shoe} />
              ))}
            </div>
          )}

          <div className="text-center mt-10 sm:hidden">
            <Button asChild variant="outline" className="font-display font-700">
              <Link to="/products" search={{}}>View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-foreground rounded-3xl px-8 py-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img
              src="/assets/generated/hero-banner.dim_1440x600.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative">
            <h2 className="font-display font-900 text-3xl sm:text-5xl text-primary-foreground mb-4">
              Find Your Perfect Pair
            </h2>
            <p className="font-body text-primary-foreground/60 text-base sm:text-lg mb-8 max-w-md mx-auto">
              Explore our full collection of premium footwear for every style and occasion.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-700 text-base h-12 px-10 rounded-full"
            >
              <Link to="/products" search={{}}>
                Explore Collection <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
