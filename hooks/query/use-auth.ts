"use client";
import {
  checkVerifyToken,
  login,
  resetPassword,
  sendEmail,
  signup,
} from "@/actions/auth.actions";
import { EmailFormType } from "@/type/auth.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error("이메일 혹은 비밀번호가 일치하지 않습니다.");
      }
    },
  });
  return mutation;
};

export const useCheckVerifyToken = (token: string) => {
  const query = useQuery({
    queryKey: ["checkVerifyToken"],
    queryFn: async () => checkVerifyToken(token),
    enabled: !!token,
    retry: false,
  });
  return query;
};

export const useSignup = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
};

export const useSendMail = () => {
  const mutation = useMutation({
    mutationFn: async ({ email, type }: EmailFormType) =>
      sendEmail(email, type),
  });
  return mutation;
};

export const useResetPassword = () => {
  const mutation = useMutation({
    mutationFn: resetPassword,
  });
  return mutation;
};
