import {
  ChangePasswordFormSchema,
  UserInfoChangeFormSchema,
} from "@/validation/user.schema";
import { z } from "zod";

export type UserInfoChangeFormType = z.infer<typeof UserInfoChangeFormSchema>;

export type ChangePasswordFormType = z.infer<typeof ChangePasswordFormSchema>;

export type UserType = z.infer<typeof UserInfoChangeFormSchema> & {
  id?: string;
  password?: string;
};
