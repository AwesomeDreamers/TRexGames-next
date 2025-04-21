"use client";
import { createProduct, findProductsAll } from "@/actions/product.actions";
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
