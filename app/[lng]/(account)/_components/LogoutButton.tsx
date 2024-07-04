"use client";

import { Button } from "@/components/ui/button";
import { useClientTranslation } from "@/i18n";
import { LogOutIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

export function LogoutButton() {
  const { t } = useClientTranslation();
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} className="font-semibold">
      {t("logout", "Logout")}
      <LogOutIcon className="w-4 h-4 ml-2" />
    </Button>
  );
}
