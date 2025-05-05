import {
  createCart,
  deleteCart,
  findCartCount,
  findCartsAll,
  updateCart,
} from "@/actions/cart.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useFindCartsAll = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const query = useQuery({
    enabled: !!userId,
    queryKey: ["carts"],
    queryFn: findCartsAll,
  });
  return query;
};

export const useFindCartCount = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const query = useQuery({
    enabled: !!userId,
    queryKey: ["carts", "count"],
    queryFn: findCartCount,
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
