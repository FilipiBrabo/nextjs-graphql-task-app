"use server";

import { LoginFormValues } from "./_components/LoginForm";

import { login as authorize } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export async function login(values: LoginFormValues) {
  await authorize(values.email, values.password);

  // TODO: fix redirect
  redirect("/");
}
