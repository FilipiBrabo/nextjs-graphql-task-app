import { LoginForm } from "./_components/LoginForm";
import { useServerTranslation } from "@/i18n";

export default async function LoginPage({ params: { lng } }: any) {
  const { t } = await useServerTranslation(lng);

  return (
    <main className="mx-auto max-w-96 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        {t("loginForm.email.label", "Login")}
      </h1>
      <LoginForm />
    </main>
  );
}
