"use client";
import {
  changePassword,
  deleteManyUsers,
  deleteUser,
  deleteUserByUserId,
  editUser,
  findUserByUserId,
  findUsersAll,
  updateUser,
} from "@/actions/user.actions";
import {
  ChangePasswordFormType,
  UserFormType,
  UserType,
} from "@/type/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFindUsersAll = ({
  name,
  page,
  take,
}: {
  name?: string;
  page: number;
  take: number;
}) => {
  const query = useQuery({
    queryKey: ["users", { name, page, take }],
    queryFn: () => findUsersAll({ name, page, take }),
  });
  return query;
};

export const useFindUserByUserId = (id?: string) => {
  const query = useQuery({
    queryKey: ["user", { id }],
    queryFn: () => findUserByUserId(id),
    retry: false,
    enabled: !!id && typeof id === "string" && id.length > 0,
  });
  return query;
};

export const useUpdateUser = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["user", { id }],
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

export const useEditUser = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["user", { id }],
    mutationFn: async (values: UserFormType) => editUser(values, id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", { id }],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};

export const useChangePassword = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["user", { id }],
    mutationFn: async (values: ChangePasswordFormType) =>
      changePassword(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["user", { id }],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};

export const useDeleteManyUsers = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["users"],
    mutationFn: async (ids: string[]) => {
      const response = await deleteManyUsers(ids);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};

export const useDeleteUserByUserId = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["user", { id }],
    mutationFn: async () => {
      const response = await deleteUserByUserId(id);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["user", { id }],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};

export const useDeleteUser = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["user", { id }],
    mutationFn: deleteUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["user", { id }],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};
