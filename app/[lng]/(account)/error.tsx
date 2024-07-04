"use client";

import { Button } from "@/components/ui/button";
import { useClientTranslation } from "@/i18n";
import { HeartCrackIcon } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useClientTranslation();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <HeartCrackIcon className="w-10 h-10" />
      <h2 className="font-semibold">
        {t("errorPage.title", "Oops... Something went wrong!")}
      </h2>
      <Button className="font-bold" onClick={() => reset()}>
        {t("errorPage.reload", "Reload")}
      </Button>
    </div>
  );
}
