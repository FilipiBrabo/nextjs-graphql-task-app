import { LoginForm } from "./_components/LoginForm";
import { getServerTranslation } from "@/i18n";

interface LoginPageProps {
  params: { lng: string };
}

export default async function LoginPage({ params: { lng } }: LoginPageProps) {
  const { t } = await getServerTranslation(lng);

  return (
    <main className="mx-auto max-w-96 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{t("loginPage.title", "Login")}</h1>
      <LoginForm />
    </main>
  );
}
