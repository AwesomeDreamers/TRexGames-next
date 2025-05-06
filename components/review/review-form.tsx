"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ProductRating from "@/components/ui/product-rating";
import { Textarea } from "@/components/ui/textarea";
import { ReviewFormType } from "@/type/review.type";
import { ReviewFormSchema } from "@/validation/review.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  id?: string;
  onSubmit: (data: ReviewFormType) => void;
  defaultValues?: ReviewFormType;
  disabled?: boolean;
}

export default function ReviewForm({
  id,
  defaultValues,
  onSubmit,
  disabled,
}: Props) {
  const form = useForm<ReviewFormType>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (values: ReviewFormType) => {
    onSubmit(values);
  };

  const { errors } = form.formState;
  console.log("Form errors:", errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="space-y-4">
          <div>
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProductRating
                      className="w-[150px]"
                      {...field}
                      value={Number(field.value)}
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>리뷰 제목</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="리뷰 제목"
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>리뷰 내용</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="리뷰 내용"
                      className="mt-1.5 min-h-[180px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={disabled} className="mt-1.5 w-full">
            {id ? "수정" : "등록"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
