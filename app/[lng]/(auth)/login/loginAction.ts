"use server";

import { LoginFormValues } from "./_components/LoginForm";

import { login as authorize } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export async function login(
  values: LoginFormValues,
  options?: { redirectTo: string }
) {
  await authorize(values.email, values.password);

  if (options?.redirectTo) redirect(options.redirectTo);
}
