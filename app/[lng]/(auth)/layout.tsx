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
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center font-bold my-auto mx-auto text-4xl ">
          Acme Inc
        </div>
      </div>
      <div className="absolute right-8 top-8">
        <LanguageSwitcher />
      </div>
      <div>{children}</div>
    </div>
  );
}
