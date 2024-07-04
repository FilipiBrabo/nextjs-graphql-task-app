"use server";

import { login as authorize } from "@/lib/auth/auth";
import { ApolloError } from "@apollo/client";
import { redirect } from "next/navigation";
import { LoginFormValues, loginFormSchema } from "./loginFormSchema";
import { fallbackLng, getServerTranslation } from "@/i18n";

type FormError = {
  field: keyof LoginFormValues | "root";
  message: string;
};

export async function login(
  values: LoginFormValues,
  options?: { redirectTo: string; lng?: string }
): Promise<
  | {
      errors: FormError[];
    }
  | undefined
> {
  const { t } = await getServerTranslation(
    options?.lng ?? fallbackLng,
    "errors"
  );

  const parsedValues = loginFormSchema.safeParse(values);

  if (!parsedValues.success) {
    const errors = parsedValues.error.issues.map((issue) => ({
      field: issue.path.join("."),
      // TODO: translate messages
      message: issue.message,
    })) as FormError[];

    return { errors };
  }

  try {
    await authorize(values.email, values.password);
  } catch (error: unknown) {
    if (error instanceof ApolloError) {
      const errorsCodes = error.graphQLErrors.map(
        (gqlErrors) =>
          (gqlErrors.extensions.exception as any)?.code as number | undefined
      );

      // Assuming 400 means user passed invalid values
      if (errorsCodes.includes(400)) {
        return {
          errors: [{ field: "root", message: t("login.invalidCredentials") }],
        };
      }
    }

    return { errors: [{ field: "root", message: t("api.500") }] };
  }

  if (options?.redirectTo) redirect(options.redirectTo);
}
