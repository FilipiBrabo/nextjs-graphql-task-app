import { Metadata } from "next";
import { LanguageSwitcher } from "../_components/LanguageSwitcher";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "ACME - Login",
};

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid grid-cols-1 md:max-w-none md:grid-cols-2 md:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white md:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="z-20 font-bold my-auto mx-auto text-4xl ">Acme Inc</div>
      </div>
      <div className="absolute right-8 top-8">
        <LanguageSwitcher />
      </div>
      <div className="px-4">{children}</div>
    </div>
  );
}
