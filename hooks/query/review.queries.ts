"use client";
import {
  createReview,
  findReviewByProductIdAndUserId,
  findReviewsByProductId,
  updateReview,
} from "@/actions/review.actions";
import { ReviewFilterType, ReviewFormType } from "@/type/review.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useReviewFilterStore } from "../store/review.store";

export function useCreateReview() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return mutation;
}

export function useFindReviewByProductIdAndUserId(productId?: number) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const query = useQuery({
    enabled: !!productId && !!userId,
    queryKey: ["review", productId, userId],
    queryFn: () => findReviewByProductIdAndUserId(productId),
  });
  return query;
}

export function useFindReviewsByProductId(productId?: number) {
  const { currentPage, sortBy, sortOrder } = useReviewFilterStore();
  const query = useQuery({
    enabled: !!productId,
    queryKey: ["reviews", { currentPage, sortBy, sortOrder, productId }],
    queryFn: ({ queryKey }) => {
      const [, filters] = queryKey;
      return findReviewsByProductId(filters as ReviewFilterType);
    },
  });
  return query;
}

export function useUpdateReview(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ReviewFormType) => updateReview(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["review", { id }],
      });
    },
  });
  return mutation;
}
