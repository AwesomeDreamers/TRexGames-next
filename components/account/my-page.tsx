"use client";
import { noImage } from "@/constants/common";
import { useDeleteUser } from "@/hooks/query/user.queries";
import { useConfirm } from "@/hooks/use-confirm";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import PasswordChangeForm from "./password-change-form";
import UserInfoChangeForm from "./user-info-change-form";

export default function MyPage({ session }: { session: Session | null }) {
  const [type, setType] = useState<"info" | "password" | null>(null);
  const userId = session?.user.id || "";
  const deleteUser = useDeleteUser(userId);
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 탈퇴하시겠습니까?",
    "삭제된 유저 정보는 복구할 수 없습니다."
  );

  return (
    <>
      <ConfirmDialog />
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold mb-6">내 정보</h2>
            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex justify-between items-center gap-4">
                <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
                  <Image
                    src={session?.user.image ?? noImage}
                    alt={session?.user.name || "유저"}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <span className="text-gray-500">{session?.user.name}</span>
                  <span className="text-gray-500">{session?.user.email}</span>
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                <Button variant={"outline"} onClick={() => setType("info")}>
                  회원정보 변경
                </Button>
                <Button variant={"outline"} onClick={() => setType("password")}>
                  비밀번호 변경
                </Button>
                <Button
                  className="bg-rose-600 text-white hover:bg-rose-700"
                  onClick={async () => {
                    const ok = await confirm();
                    if (ok) {
                      deleteUser.mutate(undefined, {
                        onSuccess: () => {
                          signOut({ callbackUrl: "/" });
                        },
                      });
                    }
                  }}
                >
                  회원 탈퇴
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {type === "info" && <UserInfoChangeForm session={session} />}
      {type === "password" && <PasswordChangeForm session={session} />}
    </>
  );
}
