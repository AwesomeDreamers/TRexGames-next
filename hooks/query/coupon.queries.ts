import {
  createCoupon,
  deleteCoupon,
  deleteCoupons,
  findCouponsAll,
} from "@/actions/coupon.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFindCouponsAll() {
  const query = useQuery({
    queryKey: ["coupons"],
    queryFn: findCouponsAll,
  });
  return query;
}

export function useCreateCoupon() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  return mutation;
}

export const useDeleteCoupons = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: number[]) => {
      const response = await deleteCoupons(ids);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
  return mutation;
};

export const useDeleteCoupon = (id?: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await deleteCoupon(id);
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["coupon", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["coupons"],
      });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("상품 삭제에 실패했습니다.");
    },
  });
  return mutation;
};
