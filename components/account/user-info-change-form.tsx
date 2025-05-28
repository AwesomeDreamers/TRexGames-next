"use client";
import { imageUpload } from "@/actions/file.actions";
import { useUpdateUser } from "@/hooks/query/user.queries";
import { UserInfoChangeFormType } from "@/type/user.type";
import { UserInfoChangeFormSchema } from "@/validation/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Icon } from "../ui/icon";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function UserInfoChangeForm({
  session,
}: {
  session: Session | null;
}) {
  const router = useRouter();
  const { update } = useSession();
  const [image, setImage] = useState<string>(session?.user.image || "");
  const userId = session?.user.id || "";
  const updateUser = useUpdateUser(userId);
  const handleSubmit = async (values: UserInfoChangeFormType) => {
    updateUser.mutate(values, {
      onSuccess: (data) => {
        const updatedData = {
          user: {
            name: data.body.name,
            image: data.body.image,
          },
        };
        void update(updatedData);
        router.push("/");
      },
    });
  };
  const form = useForm<UserInfoChangeFormType>({
    resolver: zodResolver(UserInfoChangeFormSchema),
    defaultValues: {
      name: session?.user.name,
      image: session?.user.image,
    },
  });

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);
      const data = await imageUpload(formData);
      form.setValue("image", data || "");
      setImage(data);
    }
  };

  const handleImageRemove = () => {
    setImage("");
    form.setValue("image", "");
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">회원정보 변경</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-6"
          >
            <div>
              <div className="gap-4 flex items-center justify-center">
                <div className="relative overflow-hidden size-[150px] rounded-full">
                  {image ? (
                    <Image
                      src={image}
                      alt={`Profile`}
                      fill
                      className="object-cover cursor-pointer"
                      onClick={handleImageRemove}
                    />
                  ) : (
                    <Label
                      id="image"
                      className="cursor-pointer gap-4 border flex justify-center items-center overflow-hidden size-[150px] rounded-full"
                    >
                      <div className="text-center">
                        <Icon.adminUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <span>클릭하여 업로드</span>
                          <input
                            type="file"
                            id={"image"}
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImagesChange}
                          />
                        </div>
                      </div>
                    </Label>
                  )}
                </div>
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="이름을 입력하세요" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button>변경하기</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
