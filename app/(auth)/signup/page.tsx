import EmailForm from "@/components/auth/email-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
};

export default function Signup() {
  return <EmailForm type="signup" />;
}
