import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = images.length > 0 ? images : ['/assets/generated/product-casual-loafer.dim_600x600.png'];

  const prev = () => setActiveIndex(i => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setActiveIndex(i => (i + 1) % safeImages.length);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden group">
        <img
          src={safeImages[activeIndex]}
          alt={`${alt} - view ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/product-casual-loafer.dim_600x600.png';
          }}
        />
        {safeImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-card"
              onClick={prev}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-card"
              onClick={next}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                idx === activeIndex
                  ? 'border-accent shadow-card'
                  : 'border-transparent hover:border-border'
              }`}
            >
              <img
                src={img}
                alt={`${alt} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/generated/product-casual-loafer.dim_600x600.png';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
