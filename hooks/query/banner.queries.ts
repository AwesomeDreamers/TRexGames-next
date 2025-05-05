import {
  createBanner,
  deleteBanner,
  deleteBanners,
  findBannersAll,
} from "@/actions/banner.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFindBannersAll(params: {
  page: number;
  take: number;
  title: string;
}) {
  const query = useQuery({
    queryKey: ["banners", params],
    queryFn: () => findBannersAll(params),
  });
  return query;
}

export function useCreateBanner() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
        refetchType: "active",
      });
    },
  });

  return mutation;
}

export const useDeleteBanners = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await deleteBanners(ids);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
  return mutation;
};

export const useDeleteBanner = (id?: string) => {
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
