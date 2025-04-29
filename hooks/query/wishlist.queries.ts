import {
  addWishlist,
  deleteWishlist,
  findWishlistsAll,
} from "@/actions/wishlist.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFindWishlistAll = () => {
  const query = useQuery({
    queryKey: ["wishlists"],
    queryFn: findWishlistsAll,
    retry: 3,
  });
  return query;
};

export const useAddWishlist = (productId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => addWishlist(productId),
    mutationKey: ["wishlist"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlists"],
      });
    },
  });
  return mutation;
};

export const useDeleteWishlist = (productId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteWishlist(productId),
    mutationKey: ["wishlist"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlists"],
      });
    },
  });
  return mutation;
};
