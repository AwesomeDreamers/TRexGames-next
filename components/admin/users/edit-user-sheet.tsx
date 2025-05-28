"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEditUser, useFindUserByUserId } from "@/hooks/query/user.queries";
import { useOpenUserStore } from "@/hooks/store/user.store";
import { UserFormType } from "@/type/user.type";
import { toast } from "sonner";
import UserInfoForm from "./user-info-form";

export function EditUserSheet() {
  const { isOpen, onClose, id } = useOpenUserStore();
  const editUser = useEditUser(id);
  const findUser = useFindUserByUserId(id);

  function onSubmit(values: UserFormType) {
    editUser.mutate(values, {
      onSuccess: (data) => {
        console.log("EditUserSheet onSubmit data:", data);

        toast.success(data.message);
        onClose();
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },
    });
  }

  const defaultValues = findUser.data;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <div className="p-6">
          <div className="flex flex-col gap-6">
            <SheetHeader className="flex items-center justify-between">
              <SheetTitle>회원정보 수정</SheetTitle>
            </SheetHeader>
            {findUser.isLoading ? null : (
              <UserInfoForm
                id={id}
                onSubmit={onSubmit}
                disabled={editUser.isPending}
                defaultValues={defaultValues}
              />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
