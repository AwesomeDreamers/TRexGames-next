import { create } from "zustand";

type CreateReviewState = {
  productId?: number;
  isOpen: boolean;
  onOpen: (productId: number) => void;
  onClose: () => void;
};

export const useCreateReviewStore = create<CreateReviewState>((set) => ({
  productId: undefined,
  isOpen: false,
  onOpen: (productId: number) => set({ productId, isOpen: true }),
  onClose: () => set({ isOpen: false, productId: undefined }),
}));

type EditReviewState = {
  productId?: number;
  id?: string;
  isOpen: boolean;
  onOpen: (productId: number, userId: string) => void;
  onClose: () => void;
};

export const useEditReviewStore = create<EditReviewState>((set) => ({
  productId: undefined,
  id: undefined,
  isOpen: false,
  onOpen: (productId: number, id: string) =>
    set({ productId, id, isOpen: true }),
  onClose: () => set({ isOpen: false, productId: undefined, id: undefined }),
}));

interface ReviewFilterStore {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: "asc" | "desc") => void;
  sortOrder: "asc" | "desc";
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const useReviewFilterStore = create<ReviewFilterStore>((set) => ({
  currentPage: 1,
  sortBy: "createdAt",
  sortOrder: "desc",
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSortBy: (sortBy) => set({ sortBy }),
}));
