import { create } from "zustand";

type AddCouponState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAddCouponStore = create<AddCouponState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

type OpenCouponState = {
  id?: number;
  isOpen: boolean;
  onOpen: (id: number) => void;
  onClose: () => void;
};

export const useOpenCouponStore = create<OpenCouponState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: number) => set({ id, isOpen: true }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
