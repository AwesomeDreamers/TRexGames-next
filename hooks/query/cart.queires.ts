import {
  createCart,
  deleteCart,
  findCartsAll,
  updateCart,
} from "@/actions/cart.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFindCartsAll = () => {
  const query = useQuery({
    queryKey: ["carts"],
    queryFn: findCartsAll,
    retry: 3,
  });
  return query;
};

export const useCreateCart = (productId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (quantity: number) => createCart({ productId, quantity }),
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
    },
  });
  return mutation;
};

export const useUpdateCart = (productId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (quantity: number) => updateCart({ productId, quantity }),
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
    },
  });
  return mutation;
};

export const useDeleteCart = (productId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => deleteCart(productId),
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
    },
  });
  return mutation;
};
