"use client";

import Link from "next/link";
import { languages } from "../../../i18n/settings";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useClientTranslation } from "@/i18n";

export const LanguageSwitcher = () => {
  const { i18n } = useClientTranslation();

  const currentLng = i18n.language;

  const pathname = usePathname();

  const pathWithoutLng = pathname.split("/").slice(2).join("/");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-bold flex items-center">
        {currentLng.toUpperCase()}
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((language) => {
          const isActiveLanguage = language === currentLng;
          return (
            <DropdownMenuItem
              asChild
              key={language}
              className={cn(
                "cursor-pointer",
                `${isActiveLanguage ? "bg-accent" : "bg-popover"}`
              )}
            >
              <Link href={`/${language}/${pathWithoutLng}`}>
                {language.toUpperCase()}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
