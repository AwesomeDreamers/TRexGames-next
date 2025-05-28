"use client";
import { imageUpload } from "@/actions/file.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditUser } from "@/hooks/query/user.queries";
import { UserFormType } from "@/type/user.type";
import { UserFormSchema } from "@/validation/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
interface Props {
  id?: string;
  onSubmit: (data: UserFormType) => void;
  defaultValues?: UserFormType;
  disabled?: boolean;
}
export default function UserInfoForm({
  id,
  defaultValues,
  onSubmit,
  disabled,
}: Props) {
  const [image, setImage] = useState<string>(defaultValues?.image || "");
  const updateUser = useEditUser(id);
  const handleSubmit = async (values: UserFormType) => {
    onSubmit(values);
  };
  const form = useForm<UserFormType>({
    resolver: zodResolver(UserFormSchema),
    defaultValues,
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
            <div>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>역할</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                      >
                        <SelectTrigger className="mt-1.5 w-full cursor-pointer">
                          <SelectValue placeholder="카테고리를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="cursor-pointer" value={"USER"}>
                            유저
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value={"ADMIN"}
                          >
                            관리자
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div></div>

            <div className="flex justify-end">
              <Button>변경하기</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
