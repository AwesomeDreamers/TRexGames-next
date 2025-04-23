import { create } from "zustand";

type AddBannerState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAddBannerStore = create<AddBannerState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
