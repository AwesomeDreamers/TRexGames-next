"use client";
import {
  createProduct,
  findProductById,
  findProductsAll,
  updateProduct,
} from "@/actions/product.actions";
import { ProductFormType } from "@/type/product.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
