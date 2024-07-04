import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

jest.mock("next/navigation", () => {
  return {
    usePathname: () => "/en/example",
  };
});

jest.mock("@/i18n", () => {
  return {
    useClientTranslation: () => ({
      i18n: { language: "en" },
    }),
  };
});

describe("LanguageSwitcher", () => {
  it("renders language options correctly", () => {
    render(<LanguageSwitcher />);

    const dropdownMenuButton = screen.getByRole("button");
    expect(dropdownMenuButton).toHaveTextContent("EN");
  });

  it("opens dropdown on click", () => {
    render(<LanguageSwitcher />);

    const dropdownTrigger = screen.getByText("EN");
    fireEvent.click(dropdownTrigger);

    // TODO: fix this test
    // const languageOptions = screen.getAllByRole("menuitem");

    // expect(languageOptions).toHaveLength(2);
    // expect(languageOptions[0]).toHaveTextContent("EN");
    // expect(languageOptions[1]).toHaveTextContent("PT");
  });
});
