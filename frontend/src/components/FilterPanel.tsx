import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export interface FilterState {
  sizes: number[];
  colors: string[];
  priceRange: [number, number];
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  availableSizes: number[];
  availableColors: string[];
  maxPrice: number;
}

const COLOR_SWATCHES: Record<string, string> = {
  Black: '#1a1a1a',
  White: '#f5f5f5',
  Brown: '#8B5E3C',
  Tan: '#C4A882',
  Navy: '#1B2A4A',
  Red: '#C0392B',
  Blue: '#2980B9',
  Green: '#27AE60',
  Gray: '#7F8C8D',
  Pink: '#E91E8C',
  Orange: '#E67E22',
  Yellow: '#F1C40F',
};

export default function FilterPanel({ filters, onChange, availableSizes, availableColors, maxPrice }: FilterPanelProps) {
  const toggleSize = (size: number) => {
    const next = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes: next });
  };

  const toggleColor = (color: string) => {
    const next = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onChange({ ...filters, colors: next });
  };

  const hasActiveFilters =
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[1] < maxPrice;

  const reset = () =>
    onChange({ sizes: [], colors: [], priceRange: [0, maxPrice] });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-700 text-base text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={reset} className="text-xs text-accent h-auto py-1">
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-display font-600 text-sm text-foreground mb-3">Price Range</h4>
        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={[filters.priceRange[0], filters.priceRange[1]]}
          onValueChange={([min, max]) => onChange({ ...filters, priceRange: [min, max] })}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground font-body">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      {availableSizes.length > 0 && (
        <div>
          <h4 className="font-display font-600 text-sm text-foreground mb-3">Size</h4>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map(size => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`w-10 h-10 rounded-md text-xs font-display font-700 border transition-all duration-150 ${
                  filters.sizes.includes(size)
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

      {availableSizes.length > 0 && availableColors.length > 0 && <Separator />}

      {/* Colors */}
      {availableColors.length > 0 && (
        <div>
          <h4 className="font-display font-600 text-sm text-foreground mb-3">Color</h4>
          <div className="space-y-2">
            {availableColors.map(color => (
              <div key={color} className="flex items-center gap-2.5">
                <Checkbox
                  id={`color-${color}`}
                  checked={filters.colors.includes(color)}
                  onCheckedChange={() => toggleColor(color)}
                />
                <div
                  className="w-4 h-4 rounded-full border border-border flex-shrink-0"
                  style={{ backgroundColor: COLOR_SWATCHES[color] || color }}
                />
                <Label htmlFor={`color-${color}`} className="text-sm font-body cursor-pointer">
                  {color}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
