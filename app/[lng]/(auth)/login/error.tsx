"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useClientTranslation } from "@/i18n";
import { HeartCrackIcon } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useClientTranslation();

  return (
    <div className="flex flex-col items-center gap-4">
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
