import { logout } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

export async function LogoutForm({ lng }: { lng: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await logout();
        redirect(`/${lng}/login`);
      }}
    >
      <LogoutButton />
    </form>
  );
}
