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

type OpenUserState = {
  id?: string;
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
};

export const useOpenUserStore = create<OpenUserState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id) => set({ id, isOpen: true }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
