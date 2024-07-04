import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: "form.required" }).email(),
  password: z.string().min(1, {
    message: "form.required",
  }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
