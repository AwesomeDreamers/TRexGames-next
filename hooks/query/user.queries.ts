"use client";
import {
  deleteUser,
  findUserByUserId,
  findUsersAll,
  updateUser,
} from "@/actions/user.actions";
import { UserType } from "@/type/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFindUsersAll = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: findUsersAll,
  });
  return query;
};

export const useFindUserByUserId = (id: string) => {
  const query = useQuery({
    queryKey: ["user", { id }],
    queryFn: findUserByUserId,
  });
  return query;
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: async (values: UserType) => updateUser(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", { id }],
      });
    },
  });
  return mutation;
};

export const useDeleteUser = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: deleteUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["user", { id }],
      });
    },
    onError: (error) => {
      toast.error(error as any);
    },
  });
};
