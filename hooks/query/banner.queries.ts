import {
  createBanner,
  deleteBanner,
  deleteBanners,
  findBannersAll,
} from "@/actions/banner.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFindBannersAll() {
  const query = useQuery({
    queryKey: ["banners"],
    queryFn: findBannersAll,
  });
  return query;
}

export function useCreateBanner() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  return mutation;
}

export const useDeleteBanners = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: number[]) => {
      const response = await deleteBanners(ids);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
  return mutation;
};

export const useDeleteBanner = (id?: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await deleteBanner(id);
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["banner", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("배너 삭제에 실패했습니다.");
    },
  });
  return mutation;
};
