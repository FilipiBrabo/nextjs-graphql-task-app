import { LanguageSwitcher } from "../../_components/LanguageSwitcher";
import { LogoutButton } from "./LogoutButton";
import { LogoutForm } from "./LogoutForm";

interface HeaderProps {
  lng: string;
}

export async function Header({ lng }: HeaderProps) {
  return (
    <nav className="sticky top-0 flex w-full items-center justify-between border-b p-4 text-xl font-semibold gap-1 bg-white">
      <div>ACME Inc</div>

      <div className="flex items-center gap-2">
        <div className="flex flex-row items-center gap-4">
          <LanguageSwitcher className="text-sm" />
        </div>
        <LogoutForm lng={lng} />
      </div>
    </nav>
  );
}
