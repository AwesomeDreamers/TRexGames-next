import { create } from "zustand";

type AddProductState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAddProductStore = create<AddProductState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

type OpenProductState = {
  id?: number;
  isOpen: boolean;
  onOpen: (id: number) => void;
  onClose: () => void;
};

export const useOpenProductStore = create<OpenProductState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: number) => set({ id, isOpen: true }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
