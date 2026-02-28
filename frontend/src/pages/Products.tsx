import { useState, useMemo } from 'react';
import { useSearch } from '@tanstack/react-router';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ProductCard from '@/components/ProductCard';
import FilterPanel, { type FilterState } from '@/components/FilterPanel';
import { useGetAllShoes } from '@/hooks/useQueries';

const CATEGORIES = ['All', 'Men', 'Women', 'Kids', 'Sport', 'Casual'];

export default function Products() {
  const search = useSearch({ from: '/products' }) as { category?: string };
  const initialCategory = search?.category && CATEGORIES.includes(search.category) ? search.category : 'All';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
  });

  const { data: allShoes = [], isLoading } = useGetAllShoes();

  // Compute available filter options from all shoes
  const availableSizes = useMemo(() => {
    const sizeSet = new Set<number>();
    allShoes.forEach(s => s.sizes.forEach(sz => sizeSet.add(Number(sz))));
    return Array.from(sizeSet).sort((a, b) => a - b);
  }, [allShoes]);

  const availableColors = useMemo(() => {
    const colorSet = new Set<string>();
    allShoes.forEach(s => s.colors.forEach(c => colorSet.add(c)));
    return Array.from(colorSet).sort();
  }, [allShoes]);

  const maxPrice = useMemo(() => {
    if (allShoes.length === 0) return 1000;
    return Math.max(...allShoes.map(s => Number(s.price)));
  }, [allShoes]);

  // Sync price range max when data loads
  const effectiveFilters = useMemo(() => ({
    ...filters,
    priceRange: [filters.priceRange[0], filters.priceRange[1] === 1000 ? maxPrice : filters.priceRange[1]] as [number, number],
  }), [filters, maxPrice]);

  // Apply filters
  const filteredShoes = useMemo(() => {
    return allShoes.filter(shoe => {
      if (activeCategory !== 'All' && shoe.category !== activeCategory) return false;
      const price = Number(shoe.price);
      if (price < effectiveFilters.priceRange[0] || price > effectiveFilters.priceRange[1]) return false;
      if (effectiveFilters.sizes.length > 0) {
        const shoeSizes = shoe.sizes.map(Number);
        if (!effectiveFilters.sizes.some(s => shoeSizes.includes(s))) return false;
      }
      if (effectiveFilters.colors.length > 0) {
        if (!effectiveFilters.colors.some(c => shoe.colors.includes(c))) return false;
      }
      return true;
    });
  }, [allShoes, activeCategory, effectiveFilters]);

  const activeFilterCount =
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[1] < maxPrice ? 1 : 0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <p className="font-display font-700 text-xs uppercase tracking-[0.2em] text-accent mb-2">Collection</p>
        <h1 className="font-display font-900 text-4xl sm:text-5xl text-foreground">All Products</h1>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-display font-700 transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-foreground text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 bg-card rounded-xl p-5 shadow-card">
            <FilterPanel
              filters={effectiveFilters}
              onChange={f => setFilters({ ...f, priceRange: f.priceRange })}
              availableSizes={availableSizes}
              availableColors={availableColors}
              maxPrice={maxPrice}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-muted-foreground font-body">
              {isLoading ? 'Loading...' : `${filteredShoes.length} product${filteredShoes.length !== 1 ? 's' : ''}`}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden flex items-center gap-2 font-display font-600"
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-700">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Active filter chips */}
          {(filters.sizes.length > 0 || filters.colors.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.sizes.map(s => (
                <span
                  key={s}
                  className="flex items-center gap-1 bg-secondary text-foreground text-xs font-display font-600 px-3 py-1 rounded-full"
                >
                  Size {s}
                  <button onClick={() => setFilters(f => ({ ...f, sizes: f.sizes.filter(x => x !== s) }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filters.colors.map(c => (
                <span
                  key={c}
                  className="flex items-center gap-1 bg-secondary text-foreground text-xs font-display font-600 px-3 py-1 rounded-full"
                >
                  {c}
                  <button onClick={() => setFilters(f => ({ ...f, colors: f.colors.filter(x => x !== c) }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
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
          ) : filteredShoes.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display font-700 text-xl text-muted-foreground">No products found</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
              <Button
                variant="outline"
                className="mt-4 font-display font-600"
                onClick={() => {
                  setActiveCategory('All');
                  setFilters({ sizes: [], colors: [], priceRange: [0, maxPrice] });
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredShoes.map(shoe => (
                <ProductCard key={shoe.id} shoe={shoe} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={filterOpen} onOpenChange={v => !v && setFilterOpen(false)}>
        <SheetContent side="left" className="w-72">
          <SheetHeader className="mb-4">
            <SheetTitle className="font-display font-800">Filters</SheetTitle>
          </SheetHeader>
          <FilterPanel
            filters={effectiveFilters}
            onChange={f => { setFilters({ ...f, priceRange: f.priceRange }); setFilterOpen(false); }}
            availableSizes={availableSizes}
            availableColors={availableColors}
            maxPrice={maxPrice}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
