"use client";
import {
  createProduct,
  deleteManyProducts,
  deleteProduct,
  findProductById,
  findProductsAll,
  updateProduct,
} from "@/actions/product.actions";
import {
  ProductFilterType,
  ProductFormType,
  ProductType,
} from "@/type/product.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

export function useFindProductsAll(filterOptions: ProductFilterType) {
  const query = useQuery({
    queryKey: ["products", filterOptions],
    queryFn: () => findProductsAll(filterOptions),
  });
  return query;
}

export const useFindProductById = (id?: number) => {
  const query = useQuery<ProductType>({
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
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.refetchQueries({
        queryKey: ["products"],
      });
    },
  });
  return mutation;
};

export const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: number[]) => {
      const response = await deleteManyProducts(ids);
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
