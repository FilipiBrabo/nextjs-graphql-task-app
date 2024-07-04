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
import { LoginFormValues, loginFormSchema } from "../loginFormSchema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LoginForm() {
  const { t, i18n } = useClientTranslation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting, errors, isValid, isDirty, isSubmitted } =
    form.formState;

  const onSubmit = async (values: LoginFormValues) => {
    const data = await login(values, {
      lng: i18n.language,
      redirectTo: `/${i18n.language}/`,
    });

    data?.errors.forEach((error) =>
      form.setError(error.field, { message: error.message })
    );
  };

  const router = useRouter();

  useEffect(() => {
    // Prefetch home page so user has a instant transition after login
    router.prefetch(`/${i18n.language}/`);
  }, [i18n.language, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("loginForm.email.label", "Email")}</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage data-testid="email-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("loginForm.password.label", "Password")}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage data-testid="password-error" />
            </FormItem>
          )}
        />
        {errors.root && (
          <div className={"text-[0.8rem] font-medium text-destructive"}>
            {errors.root.message}
          </div>
        )}

        <Button
          type="submit"
          className="w-full font-bold"
          isLoading={isSubmitting}
          disabled={(!isValid && isSubmitted) || isSubmitting}
        >
          {t("loginForm.submit", "Login")}
        </Button>
      </form>
    </Form>
  );
}
