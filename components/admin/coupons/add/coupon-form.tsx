"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, randomCouponCode } from "@/lib/utils";
import { CouponFormType } from "@/type/coupon.type";
import { CouponFormSchema } from "@/validation/coupon.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface CouponFormProps {
  id?: number;
  onSubmit: (data: CouponFormType) => void;
  defaultValues?: CouponFormType;
  disabled?: boolean;
}

export default function CouponForm({
  id,
  defaultValues,
  onSubmit,
  disabled,
}: CouponFormProps) {
  const form = useForm<CouponFormType>({
    resolver: zodResolver(CouponFormSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (values: CouponFormType) => {
    onSubmit(values);
  };
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  const { errors } = form.formState;
  console.log("에러", errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-1"
      >
        <div className="space-y-4">
          <div>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>시작일</FormLabel>
                  <Popover
                    open={isStartDateOpen}
                    onOpenChange={setIsStartDateOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal mt-1.5",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>시작일을 선택하세요.</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setIsStartDateOpen(false);
                        }}
                        disabled={(date) =>
                          date < new Date() || date > form.getValues("endDate")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>종료일</FormLabel>
                  <Popover
                    open={isEndDateOpen}
                    onOpenChange={(isOpen) => {
                      if (isOpen && !form.getValues("startDate")) {
                        toast.error("먼저 시작일을 선택하세요.");
                        return;
                      }
                      setIsEndDateOpen(isOpen);
                    }}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal mt-1.5",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>종료일을 선택하세요.</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setIsEndDateOpen(false);
                        }}
                        disabled={(date) => date < form.getValues("startDate")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>쿠폰 코드</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-4 mt-1.5">
                      <Input placeholder="쿠폰 코드" readOnly {...field} />
                      <Button
                        variant={"outline"}
                        type="button"
                        onClick={() => {
                          const code = randomCouponCode();
                          form.setValue("code", code);
                        }}
                      >
                        코드 생성
                      </Button>
                    </div>
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
                      min={0}
                      max={100}
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
              name="usageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>발급건수</FormLabel>
                  <FormControl>
                    <Input type="number" className="mt-1.5" {...field} />
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
