import "dotenv/config";
import { test, expect } from "@playwright/test";
import { waitFor } from "@testing-library/react";

test("Redirects unauthenticated user to login", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/en/login");

  await page.goto("/admin");
  await expect(page).toHaveURL("/en/login");
});

test("Show errors to user with invalid credentials", async ({ page }) => {
  await page.goto("/");
  await page.click('button[type="submit"]');

  const emailError = page.getByTestId("email-error");
  expect(emailError).toContainText("This field is required");

  const passwordError = page.getByTestId("password-error");
  expect(passwordError).toContainText("This field is required");

  await page.fill('input[name="email"]', "a@a");
  expect(emailError).toContainText("Invalid email");

  await page.fill('input[name="password"]', "123");
  await page.fill('input[name="email"]', "a@a.example");
  expect(emailError).toBeHidden();
  expect(passwordError).toBeHidden();

  await page.click('button[type="submit"]');

  await page.getByText("Invalid credentials").hover();
  expect(page.getByText("Invalid credentials")).toBeVisible();

  await page.fill('input[name="password"]', process.env.PASSWORD!);
  await page.fill('input[name="email"]', process.env.EMAIL!);
  await page.click('button[type="submit"]');

  await page.waitForURL("/en");
  await expect(page).toHaveURL("/en");
});

test("Logs in and navigate to home page", async ({ page }) => {
  await page.goto("/");
  await page.fill('input[name="password"]', process.env.PASSWORD!);
  await page.fill('input[name="email"]', process.env.EMAIL!);
  await page.click('button[type="submit"]');

  await page.waitForURL("/en");
  await expect(page).toHaveURL("/en");
});
