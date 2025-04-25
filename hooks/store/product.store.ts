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

type OpenFilterState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenFilterStore = create<OpenFilterState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface FilterStore {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
  priceRange: [number, number];
  currentPage: number;
  setPriceRange: (range: [number, number]) => void;
  setCurrentPage: (page: number) => void;
  sortBy: string;
  name: string;
  setSortBy: (sortBy: string) => void;
  setName: (name: string) => void;
  setSortOrder: (sortOrder: "asc" | "desc") => void;
  sortOrder: "asc" | "desc";
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedCategories: [],
  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),
  selectedPlatforms: [],
  currentPage: 1,
  sortBy: "createdAt",
  name: "",
  sortOrder: "desc",
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSelectedPlatforms: (platforms) => set({ selectedPlatforms: platforms }),
  priceRange: [0, 100000],
  setPriceRange: (range) => set({ priceRange: range }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSortBy: (sortBy) => set({ sortBy }),
  setName: (name) => set({ name }),
}));
