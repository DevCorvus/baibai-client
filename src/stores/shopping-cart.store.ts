import { create } from 'zustand';
import { Product } from '../interfaces/product';

interface ShoppingCartState {
  data: Product[];
  get count(): number;
  add(product: Product): boolean;
  remove(id: string): void;
  exists(id: string): boolean;
  reset(): void;
}

export const useShoppingCartStore = create<ShoppingCartState>((set, get) => ({
  data: [],
  get count() {
    return get().data.length;
  },
  add(product) {
    const productExists = get().exists(product.id);

    if (!productExists) {
      set({ data: [...get().data, product] });
      return true;
    } else {
      return false;
    }
  },
  remove(id) {
    set({ data: get().data.filter((product) => product.id !== id) });
  },
  exists(id) {
    return get().data.some((product) => product.id === id);
  },
  reset() {
    set({ data: [] });
  },
}));
