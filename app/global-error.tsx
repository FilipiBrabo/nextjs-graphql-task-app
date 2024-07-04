"use client";

import { Button } from "@/components/ui/button";
import { useClientTranslation } from "@/i18n";
import { HeartCrackIcon } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useClientTranslation();

  return (
    <html>
      <body>
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
          <HeartCrackIcon className="w-10 h-10" />
          <h2 className="font-semibold">
            {t("errorPage.title", "Oops... Something went wrong!")}
          </h2>
          <Button className="font-bold" onClick={() => reset()}>
            {t("errorPage.reload", "Reload")}
          </Button>
        </div>
      </body>
    </html>
  );
}
