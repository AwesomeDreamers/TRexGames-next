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
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenProductStore = create<OpenProductState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ id, isOpen: true }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
