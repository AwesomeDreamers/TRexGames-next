import { create } from "zustand";

type OpenOrderState = {
  orderId?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenOrderStore = create<OpenOrderState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (orderId: string) => set({ orderId, isOpen: true }),
  onClose: () => set({ isOpen: false, orderId: undefined }),
}));
