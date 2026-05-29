import { createContext, useContext, useState, useCallback } from "react";

export interface CartItem {
  slug: string;
  name: string;
  price: string;
  img: string;
  size: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeItem: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, delta: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((newItem: Omit<CartItem, "qty">) => {
    setItems(prev => {
      const existing = prev.find(i => i.slug === newItem.slug && i.size === newItem.size);
      if (existing) {
        return prev.map(i =>
          i.slug === newItem.slug && i.size === newItem.size
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    setItems(prev => prev.filter(i => !(i.slug === slug && i.size === size)));
  }, []);

  const updateQty = useCallback((slug: string, size: string, delta: number) => {
    setItems(prev =>
      prev
        .map(i => i.slug === slug && i.size === size ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => {
    const price = parseFloat(i.price.replace("$", ""));
    return sum + price * i.qty;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeItem, updateQty, clearCart, cartOpen, setCartOpen, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
