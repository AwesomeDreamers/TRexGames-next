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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, platforms } from "@/constants/product.constants";
import useQuillImageReplacement from "@/hooks/image-replacement";
import { CategoryType } from "@/type/category.type";
import { PlatformType } from "@/type/platform.type";
import { ProductFormType } from "@/type/product.type";
import { ProductFormSchema } from "@/validation/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
interface ProductFormProps {
  id?: number;
  onSubmit: (data: ProductFormType) => void;
  defaultValues?: ProductFormType;
  disabled?: boolean;
}
const ReactQuillEditor = dynamic(() => import("./react-quill-editor"), {
  ssr: false,
});

export default function ProductForm({
  id,
  defaultValues,
  onSubmit,
  disabled,
}: ProductFormProps) {
  const [images, setImages] = useState<string[]>(defaultValues?.images || []);
  const { replaceImages } = useQuillImageReplacement();
  const form = useForm<ProductFormType>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (values: ProductFormType) => {
    if (images.length > 0) {
      values.images = [...images];
    }
    if (values.description) {
      values.description = await replaceImages(values.description, values.slug);
    }
    onSubmit(values);
  };
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
  // if (CategoryLoading || PlatformLoading)
  //   return (
  //     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
  //       <div className="grid grid-cols-2 place-content-center place-items-center gap-4 md:flex md:items-center md:flex-wrap md:place-content-start">
  //         {Array.from({ length: 6 }).map((_, index) => (
  //           <Skeleton
  //             key={index}
  //             id={`skeleton-${index}`}
  //             className="w-[150px] h-[100px] md:w-[200px] md:h-[150px] mt-2 flex flex-col items-center justify-center rounded-lg p-12"
  //           />
  //         ))}
  //       </div>
  //       <div className="space-y-4">
  //         {Array.from({ length: 6 }).map((_, index) => (
  //           <div key={index} id={`skeleton-${index}`}>
  //             <Skeleton className="w-16 h-5" />
  //             <Skeleton className="mt-1.5 w-full h-9" />
  //           </div>
  //         ))}
  //         <div>
  //           <Skeleton className="w-16 h-5" />
  //           <Skeleton className="mt-1.5 w-full h-[150px]" />
  //         </div>
  //         <div className="grid grid-cols-2 gap-4">
  //           {Array.from({ length: 2 }).map((_, index) => (
  //             <div className="space-y-4" key={index} id={`skeleton-${index}`}>
  //               <Skeleton className="mb-4 w-20 h-7" />
  //               {Array.from({ length: 6 }).map((_, index) => (
  //                 <div key={index} id={`skeleton-${index}`}>
  //                   <Skeleton className="w-16 h-5" />
  //                   <Skeleton className="mt-1.5 w-full h-9" />
  //                 </div>
  //               ))}
  //             </div>
  //           ))}
  //         </div>
  //         <Skeleton className="mt-1.5 w-full" />
  //       </div>
  //     </div>
  //   );

  const { errors } = form.formState;
  console.log("Form errors:", errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-1"
      >
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
          {images.length < 6 && (
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
        <div className="space-y-4">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상품 이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="상품 이름"
                      className="mt-1.5"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        const slugValue = e.target.value
                          .replace(/\s+/g, "-")
                          .replace(/:/g, "");
                        form.setValue("slug", slugValue);
                      }}
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
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>슬러그</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="슬러그"
                      className="mt-1.5"
                      readOnly
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="mt-1.5 w-full cursor-pointer">
                        <SelectValue placeholder="카테고리를 선택하세요" />
                      </SelectTrigger>
                      {
                        <SelectContent>
                          {categories.map((category: CategoryType) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      }
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="platformId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>플랫폼</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="mt-1.5 w-full cursor-pointer">
                        <SelectValue placeholder="플랫폼을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform: PlatformType) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={platform.id}
                            value={platform.id}
                          >
                            {platform.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>할인율 (100까지 입력가능)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      max={100}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1.5">상품 설명</FormLabel>
                  <FormControl>
                    <ReactQuillEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <p className="mb-4 text-lg">최소사양</p>
              <div>
                <FormField
                  control={form.control}
                  name="minSpec.os"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OS</FormLabel>
                      <FormControl>
                        <Input className="mt-1.5" placeholder="OS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="minSpec.cpu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPU</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1.5"
                          placeholder="CPU"
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
                  name="minSpec.gpu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GPU</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1.5"
                          placeholder="GPU"
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
                  name="minSpec.ram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RAM</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1.5"
                          placeholder="RAM"
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
                  name="minSpec.storage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>저장 공간</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1.5"
                          placeholder="저장 공간"
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
                  name="minSpec.directX"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DIRECT X</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1.5"
                          placeholder="DIRECT X"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4">
              <p className="mb-4 text-lg">권장사양</p>
              <div>
                <FormField
                  control={form.control}
                  name="recSpec.os"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OS</FormLabel>
                      <FormControl>
                        <Input className="mt-1.5" placeholder="OS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="recSpec.cpu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPU</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1.5"
                          placeholder="CPU"
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
                  name="recSpec.gpu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GPU</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1.5"
                          placeholder="GPU"
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
                  name="recSpec.ram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RAM</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1.5"
                          placeholder="RAM"
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
                  name="recSpec.storage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>저장 공간</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1.5"
                          placeholder="저장 공간"
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
                  name="recSpec.directX"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DIRECT X</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1.5"
                          placeholder="DIRECT X"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button type="submit" disabled={disabled} className="mt-1.5 w-full">
            {id ? "수정" : "등록"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
