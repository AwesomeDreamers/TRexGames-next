"use client";
import { imageUpload } from "@/actions/file.actions";
import { Button } from "@/components/ui/button";
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
import { BannerFormType } from "@/type/banner.type";
import { BannerFormSchema } from "@/validation/banner.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {} from "@radix-ui/react-popover";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
interface BannerFormProps {
  id?: number;
  onSubmit: (data: BannerFormType) => void;
  defaultValues?: BannerFormType;
  disabled?: boolean;
}

export default function BannerForm({
  id,
  defaultValues,
  onSubmit,
  disabled,
}: BannerFormProps) {
  const [image, setImage] = useState<string | null>(null);
  const form = useForm<BannerFormType>({
    resolver: zodResolver(BannerFormSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (values: BannerFormType) => {
    if (!image) {
      form.setError("image", {
        type: "custom",
        message: "이미지를 업로드 해주세요.",
      });
      return;
    }
    if (image) {
      values.image = image;
    }
    onSubmit(values);
  };
  const { errors } = form.formState;
  console.log("에러", errors);

  const handleImageRemove = () => {
    setImage(null);
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const data = await imageUpload(formData);
      setImage(data);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-1"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 place-content-center place-items-center gap-4 md:flex md:items-center md:flex-wrap md:place-content-start">
            <Label>배너 이미지</Label>
            {!image ? (
              <Label
                id="image"
                className="cursor-pointer w-full h-[200px] -mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-400 p-12"
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
            ) : (
              <div className="relative overflow-hidden -mt-2 w-full h-[200px] not-visited:flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-400 p-12">
                <Image
                  src={image || ""}
                  alt={`Uploaded Banner`}
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => handleImageRemove()}
                />
              </div>
            )}
          </div>
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>배너이름</FormLabel>
                  <FormControl>
                    <Input placeholder="배너이름" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>링크</FormLabel>
                  <FormControl>
                    <Input placeholder="링크" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={disabled} className="mt-1.5 w-full">
            등록
          </Button>
        </div>
      </form>
    </Form>
  );
}
