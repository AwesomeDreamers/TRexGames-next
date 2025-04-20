import EmailForm from "@/components/auth/email-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
};

export default function ResetPassword() {
  return <EmailForm type="reset" />;
}
