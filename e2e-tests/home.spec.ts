import "dotenv/config";
import { test, expect } from "@playwright/test";
import { waitFor } from "@testing-library/react";

test("Show user first and last name", async ({ page }) => {
  await page.goto("/");
  await page.fill('input[name="password"]', process.env.PASSWORD!);
  await page.fill('input[name="email"]', process.env.EMAIL!);
  await page.click('button[type="submit"]');

  await page.waitForURL("/en");
  expect(page.getByText("Logout")).toBeVisible();

  await page.getByText("FirstName").hover();

  expect(page.getByText("FirstName")).toBeVisible();
  expect(page.getByText("LastName")).toBeVisible();
});

test("Logout and navigate to login", async ({ page }) => {
  await page.goto("/");
  await page.fill('input[name="password"]', process.env.PASSWORD!);
  await page.fill('input[name="email"]', process.env.EMAIL!);
  await page.click('button[type="submit"]');

  await page.waitForURL("/en");
  const logoutButton = page.getByText("Logout");

  expect(logoutButton).toBeVisible();

  await logoutButton.click();
  await page.waitForURL("/en/login");
  await expect(page).toHaveURL("/en/login");
  await page.getByRole("button").getByText("Login").hover();
});
