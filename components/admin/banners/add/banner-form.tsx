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
  // id,
  defaultValues,
  onSubmit,
  disabled,
}: BannerFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const form = useForm<BannerFormType>({
    resolver: zodResolver(BannerFormSchema),
    defaultValues: defaultValues,
  });
  // console.log("images", images);

  const handleSubmit = async (values: BannerFormType) => {
    // if (!images) {
    //   form.setError("images", {
    //     type: "custom",
    //     message: "이미지를 업로드 해주세요.",
    //   });
    //   return;
    // }
    if (images.length > 0) {
      values.images = [...images];
    }
    onSubmit(values);
  };
  const { errors } = form.formState;
  console.log("에러", errors);

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const data = await imageUpload(formData);
        newImages.push(data);
        setImages((prev) => [...prev, ...newImages]);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-1"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 place-content-center place-items-center gap-4 md:flex md:items-center md:flex-wrap md:place-content-start">
            {images.map((image, index) => (
              <div
                key={image}
                className="relative overflow-hidden w-[150px] h-[100px] md:w-[200px] md:h-[150px] mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-400 p-12"
              >
                <Image
                  src={image}
                  alt={`Uploaded ${index}`}
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => handleImageRemove(index)}
                />
              </div>
            ))}
            {images.length < 2 && (
              <Label
                id="images"
                className="cursor-pointer w-[150px] h-[100px] md:w-[200px] md:h-[150px] mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-400 p-12"
              >
                <div className="text-center">
                  <Icon.adminUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <span>클릭하여 업로드</span>
                    <input
                      type="file"
                      id={"images"}
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImagesChange}
                    />
                  </div>
                </div>
              </Label>
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
                    <Input
                      placeholder="배너이름"
                      className="mt-1.5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상품 가격</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="mt-1.5"
                      {...field}
                      value={Number(field.value)}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="URL" className="mt-1.5" {...field} />
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
