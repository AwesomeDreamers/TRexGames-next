import {
  addWishlist,
  deleteWishlist,
  findWishlistCount,
  findWishlistsAll,
} from "@/actions/wishlist.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useFindWishlistAll = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const query = useQuery({
    enabled: !!userId,
    queryKey: ["wishlists"],
    queryFn: findWishlistsAll,
  });
  return query;
};

export const useFindWishlistCount = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const query = useQuery({
    enabled: !!userId,
    queryKey: ["wishlists", "count"],
    queryFn: findWishlistCount,
  });
  return query;
};

export const useAddWishlist = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (productId: number) => addWishlist(productId),
    mutationKey: ["wishlist"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlists"],
      });
    },
  });
  return mutation;
};

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (productId: number) => deleteWishlist(productId),
    mutationKey: ["wishlist"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlists"],
      });
    },
  });
  return mutation;
};
