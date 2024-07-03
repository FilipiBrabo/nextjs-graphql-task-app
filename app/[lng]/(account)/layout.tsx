import { Metadata } from "next";
import { languages } from "@/i18n/settings";
import { Header } from "./_components/Header";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: "ACME - Account",
};

export default function AccountLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <div className="grid h-screen grid-rows-[auto,1fr]">
      <Header lng={lng} />
      <main>{children}</main>
    </div>
  );
}
