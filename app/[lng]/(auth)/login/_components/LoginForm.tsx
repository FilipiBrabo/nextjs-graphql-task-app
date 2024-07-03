"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useClientTranslation } from "@/i18n";
import { login } from "../loginAction";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "This field is required" }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { t, i18n } = useClientTranslation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: LoginFormValues) => {
    await login(values, { redirectTo: `/${i18n.language}/` });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>{t("loginForm.email.label", "Email")}</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>
                  {t("loginForm.password.label", "Password")}
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button
          type="submit"
          className="w-full font-bold"
          isLoading={isSubmitting}
        >
          {t("loginForm.submit", "Login")}
        </Button>
      </form>
    </Form>
  );
}
