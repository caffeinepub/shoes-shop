import { Link } from '@tanstack/react-router';
import type { Shoe } from '@/backend';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  shoe: Shoe;
}

const FALLBACK_IMAGES: Record<string, string> = {
  Men: '/assets/generated/product-mens-sneaker.dim_600x600.png',
  Women: '/assets/generated/product-womens-boot.dim_600x600.png',
  Kids: '/assets/generated/product-kids-sneaker.dim_600x600.png',
  Sport: '/assets/generated/product-mens-sneaker.dim_600x600.png',
  Casual: '/assets/generated/product-casual-loafer.dim_600x600.png',
};

export function getProductImage(shoe: Shoe): string {
  if (shoe.imageUrls && shoe.imageUrls.length > 0) {
    return shoe.imageUrls[0];
  }
  return FALLBACK_IMAGES[shoe.category] || '/assets/generated/product-casual-loafer.dim_600x600.png';
}

export default function ProductCard({ shoe }: ProductCardProps) {
  const imageUrl = getProductImage(shoe);
  const price = Number(shoe.price);

  return (
    <Link
      to="/products/$id"
      params={{ id: shoe.id }}
      className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={imageUrl}
          alt={shoe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/product-casual-loafer.dim_600x600.png';
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="text-xs font-display font-600 uppercase tracking-wide">
            {shoe.category}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display font-700 text-base text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {shoe.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{shoe.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-display font-800 text-lg text-foreground">
            ${price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground font-body">
            {shoe.sizes.length} sizes
          </span>
        </div>
      </div>
    </Link>
  );
}
