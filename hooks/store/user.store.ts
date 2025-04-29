import { create } from "zustand";

type CartState = {
  isCartOpen: boolean;
  onCartOpen: () => void;
  onCartClose: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  isCartOpen: false,
  onCartOpen: () => set({ isCartOpen: true }),
  onCartClose: () => set({ isCartOpen: false }),
}));

type MenuState = {
  isMenuOpen: boolean;
  onMenuOpen: () => void;
  onMenuClose: () => void;
};

export const useMenuStore = create<MenuState>((set) => ({
  isMenuOpen: false,
  onMenuOpen: () => set({ isMenuOpen: true }),
  onMenuClose: () => set({ isMenuOpen: false }),
}));
