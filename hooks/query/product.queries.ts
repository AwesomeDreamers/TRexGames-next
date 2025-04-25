"use client";
import {
  createProduct,
  deleteProduct,
  deleteProducts,
  findProductById,
  findProductsAll,
  findProductsAllForClient,
  updateProduct,
} from "@/actions/product.actions";
import { ProductFormType, ProductQueryType } from "@/type/product.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFilterStore } from "../store/product.store";

export function useFindProductsAll() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: findProductsAll,
  });
  return query;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return mutation;
}

export const useFindProductById = (id?: number) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["product", { id }],
    queryFn: async () => {
      const response = await findProductById(id);
      return response.payload;
    },
  });
  return query;
};

export const useUpdateProduct = (id?: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: ProductFormType) => {
      const response = await updateProduct(data, id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", { id }],
      });
    },
  });
  return mutation;
};

export const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: number[]) => {
      const response = await deleteProducts(ids);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return mutation;
};

export const useDeleteProduct = (id?: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await deleteProduct(id);
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["product", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("상품 삭제에 실패했습니다.");
    },
  });
  return mutation;
};

export const useClientProducts = () => {
  const {
    selectedCategories,
    selectedPlatforms,
    priceRange,
    currentPage,
    name,
    sortBy,
    sortOrder,
  } = useFilterStore();

  const query = useQuery({
    queryKey: [
      "products",
      {
        categories: selectedCategories,
        platforms: selectedPlatforms,
        priceRange,
        page: currentPage,
        sortBy,
        name,
        sortOrder,
      },
    ],
    queryFn: ({ queryKey }) => {
      const [, filters] = queryKey;
      return findProductsAllForClient({
        ProductQueryType: filters as unknown as ProductQueryType,
      });
    },
    staleTime: 5000, // Adjust the time (in milliseconds) as needed
  });
  return query;
};

// export function useClientProducts(params: URLSearchParams) {
//   const query = useQuery({
//     enabled: !!params,
//     queryKey: ["products", params.toString()], // params를 queryKey에 포함
//     queryFn: async () => findProductsAllForClient(params),
//     retry: 3, // 최대 3번 재시도
//   });

//   return query;
// }
