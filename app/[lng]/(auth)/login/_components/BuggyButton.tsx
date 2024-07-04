"use client";

import { Button } from "@/components/ui/button";
import { useClientTranslation } from "@/i18n";
import { Bomb } from "lucide-react";
import { useState } from "react";

export const BuggyButton = () => {
  const { t } = useClientTranslation();
  const [error, setError] = useState<boolean | null>(null);

  if (error) {
    throw new Error("Error on render!");
  }

  const handleClick = () => {
    setError(true);
  };

  return (
    <>
      <Button className="font-bold" onClick={handleClick}>
        <Bomb className="w-4 h-4 mr-2" />
        {t("buggyButton", "Throw Error")}
      </Button>
    </>
  );
};
