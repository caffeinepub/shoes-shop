import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: number;
  color: string;
  quantity: number;
  imageUrl: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, size: number, color: string, quantity: number) => void;
  removeItem: (id: string, size: number, color: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_SESSION_KEY = 'sole_street_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = sessionStorage.getItem(CART_SESSION_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(CART_SESSION_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.id === newItem.id && i.size === newItem.size && i.color === newItem.color
      );
      if (existing) {
        return prev.map(i =>
          i.id === newItem.id && i.size === newItem.size && i.color === newItem.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, size: number, color: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => !(i.id === id && i.size === size && i.color === color)));
    } else {
      setItems(prev =>
        prev.map(i =>
          i.id === id && i.size === size && i.color === color ? { ...i, quantity } : i
        )
      );
    }
  }, []);

  const removeItem = useCallback((id: string, size: number, color: string) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size && i.color === color)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
