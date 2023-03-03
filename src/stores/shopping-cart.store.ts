import { create } from 'zustand';
import { Product, ShoppingCartProduct } from '../interfaces/product';

interface ShoppingCartState {
  data: ShoppingCartProduct[];
  add(product: Product): boolean;
  remove(id: string): void;
  exists(id: string): boolean;
  find(id: string): ShoppingCartProduct | undefined;
  reset(): void;
  increaseAmount(id: string): void;
  decreaseAmount(id: string): void;
}

export const useShoppingCartStore = create<ShoppingCartState>((set, get) => ({
  data: [],
  add(product) {
    const productExists = get().exists(product.id);

    if (!productExists) {
      set({ data: [...get().data, { product, amount: 1 }] });
      return true;
    } else {
      return false;
    }
  },
  remove(id) {
    set({ data: get().data.filter((item) => item.product.id !== id) });
  },
  exists(id) {
    return get().data.some((item) => item.product.id === id);
  },
  reset() {
    set({ data: [] });
  },
  find(id) {
    return get().data.find((item) => item.product.id === id);
  },
  increaseAmount(id) {
    const item = get().find(id);

    if (item && item.amount !== item.product.quantity) {
      set({
        data: get().data.map((item) => {
          if (item.product.id === id) {
            return { ...item, amount: item.amount + 1 };
          } else {
            return item;
          }
        }),
      });
    }
  },
  decreaseAmount(id) {
    const item = get().find(id);

    if (item && item.amount !== 1) {
      set({
        data: get().data.map((item) => {
          if (item.product.id === id) {
            return { ...item, amount: item.amount - 1 };
          } else {
            return item;
          }
        }),
      });
    }
  },
}));
