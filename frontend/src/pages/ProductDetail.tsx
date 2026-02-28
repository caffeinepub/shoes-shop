import { useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import ImageGallery from '@/components/ImageGallery';
import { useGetShoe } from '@/hooks/useQueries';
import { useCart } from '@/context/CartContext';
import { getProductImage } from '@/components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams({ from: '/products/$id' });
  const { data: shoe, isLoading, isError } = useGetShoe(id);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!shoe || selectedSize === null || selectedColor === null) return;
    const imageUrl = shoe.imageUrls.length > 0
      ? shoe.imageUrls[0]
      : getProductImage(shoe);

    addItem({
      id: shoe.id,
      name: shoe.name,
      price: Number(shoe.price),
      size: selectedSize,
      color: selectedColor,
      imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Skeleton className="h-5 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !shoe) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="font-display font-700 text-2xl text-foreground mb-3">Product not found</p>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
        <Button asChild variant="outline">
          <Link to="/products" search={{}}>Back to Products</Link>
        </Button>
      </div>
    );
  }

  const price = Number(shoe.price);
  const sizes = shoe.sizes.map(Number).sort((a, b) => a - b);
  const canAddToCart = selectedSize !== null && selectedColor !== null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <Link
        to="/products"
        search={{}}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 font-body"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <ImageGallery images={shoe.imageUrls} alt={shoe.name} />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-2">
            <Badge variant="secondary" className="font-display font-600 uppercase tracking-wide text-xs">
              {shoe.category}
            </Badge>
          </div>

          <h1 className="font-display font-900 text-3xl sm:text-4xl text-foreground mt-2 mb-3">
            {shoe.name}
          </h1>

          <p className="font-display font-800 text-3xl text-accent mb-4">
            ${price.toFixed(2)}
          </p>

          <p className="font-body text-muted-foreground leading-relaxed mb-6">
            {shoe.description}
          </p>

          <Separator className="mb-6" />

          {/* Color Selector */}
          {shoe.colors.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-700 text-sm text-foreground">Color</h3>
                {selectedColor && (
                  <span className="text-sm text-muted-foreground font-body">{selectedColor}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {shoe.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full text-sm font-display font-600 border transition-all duration-150 ${
                      selectedColor === color
                        ? 'bg-foreground text-primary-foreground border-foreground'
                        : 'bg-card text-foreground border-border hover:border-foreground'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-700 text-sm text-foreground">Size</h3>
                {selectedSize && (
                  <span className="text-sm text-muted-foreground font-body">EU {selectedSize}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg text-sm font-display font-700 border transition-all duration-150 ${
                      selectedSize === size
                        ? 'bg-foreground text-primary-foreground border-foreground'
                        : 'bg-card text-foreground border-border hover:border-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Validation hint */}
          {!canAddToCart && (
            <p className="text-xs text-muted-foreground mb-4 font-body">
              {!selectedColor && shoe.colors.length > 0 ? '• Select a color' : ''}
              {!selectedColor && shoe.colors.length > 0 && !selectedSize && sizes.length > 0 ? ' and ' : ''}
              {!selectedSize && sizes.length > 0 ? '• Select a size' : ''}
            </p>
          )}

          {/* Add to Cart */}
          <Button
            size="lg"
            disabled={!canAddToCart}
            onClick={handleAddToCart}
            className={`h-14 text-base font-display font-700 rounded-xl transition-all duration-200 ${
              added
                ? 'bg-green-600 hover:bg-green-600 text-white'
                : 'bg-accent hover:bg-accent/90 text-accent-foreground'
            }`}
          >
            {added ? (
              <>
                <Check className="mr-2 w-5 h-5" /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2 w-5 h-5" /> Add to Cart
              </>
            )}
          </Button>

          <Separator className="my-6" />

          {/* Product details */}
          <div className="space-y-2 text-sm font-body text-muted-foreground">
            <div className="flex gap-2">
              <span className="font-display font-600 text-foreground w-20">Category</span>
              <span>{shoe.category}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-display font-600 text-foreground w-20">Sizes</span>
              <span>{sizes.join(', ')}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-display font-600 text-foreground w-20">Colors</span>
              <span>{shoe.colors.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
