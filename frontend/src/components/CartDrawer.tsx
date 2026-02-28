import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-display font-800 text-xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent" />
            Your Cart
            {totalItems > 0 && (
              <span className="ml-1 text-sm font-body font-400 text-muted-foreground">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-display font-700 text-lg text-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Add some shoes to get started!</p>
            </div>
            <Button variant="outline" onClick={onClose} className="mt-2">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={`${item.id}-${item.size}-${item.color}-${idx}`}>
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/generated/product-casual-loafer.dim_600x600.png';
                          }}
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-700 text-sm text-foreground line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Size {item.size} · {item.color}
                        </p>
                        <p className="font-display font-700 text-sm text-accent mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-7 h-7"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="font-display font-700 text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-7 h-7"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-7 h-7 ml-auto text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id, item.size, item.color)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {idx < items.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="px-6 py-5 border-t border-border flex-col gap-3">
              <div className="flex items-center justify-between w-full">
                <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display font-800 text-xl text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Shipping & taxes calculated at checkout
              </p>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-700 text-base h-12">
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Continue Shopping
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
