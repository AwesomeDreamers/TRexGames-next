import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
};

export default function Signup() {
  return <ResetPasswordForm />;
}
