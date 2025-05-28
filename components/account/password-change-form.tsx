import { useChangePassword } from "@/hooks/query/user.queries";
import { ChangePasswordFormType } from "@/type/user.type";
import { ChangePasswordFormSchema } from "@/validation/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
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
import { Input } from "../ui/input";

export default function PasswordChangeForm({
  session,
}: {
  session: Session | null;
}) {
  const router = useRouter();
  const userId = session?.user.id || "";
  const changepassword = useChangePassword(userId);
  const handleSubmit = async (values: ChangePasswordFormType) => {
    changepassword.mutate(values, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  const form = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  console.log("fom errors", form.formState.errors);

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">비밀번호 변경</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-6"
          >
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새로운 비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="새로운 비밀번호"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새로운 비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="새로운 비밀번호 확인"
                        {...field}
                      />
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
