import { ProfileFormSchema } from "@/validation/user.schema";
import { z } from "zod";

export type UserType = z.infer<typeof ProfileFormSchema> & {
  id?: string;
  password?: string;
};
