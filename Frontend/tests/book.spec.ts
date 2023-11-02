import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  // Check that the page title is correct
  await expect(page.getByText("Book Tracker App")).toBeVisible();

  // Check add book functionality
  await page.getByPlaceholder("Add Books").fill("atomic habit");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(
    page
      .locator("#to-read-section")
      .getByRole("heading", { name: "atomic habit" })
  ).toBeVisible();

  // Check reading functionality
  await page
    .locator("#to-read-section")
    .getByRole("listitem")
    .filter({ hasText: "atomic habit" })
    .getByRole("button", { name: "Reading" })
    .click();
  await expect(
    page
      .locator("#to-read-section")
      .getByRole("listitem")
      .filter({ hasText: "atomic habit" })
  ).toHaveCount(0);

  // Check progress functionality
  await page
    .locator("#in-progress-section")
    .getByRole("listitem")
    .filter({ hasText: "atomic habit" })
    .getByRole("button", { name: "Completed" })
    .click();
  await expect(
    page
      .locator("#in-progress-section")
      .getByRole("listitem")
      .filter({ hasText: "atomic habit" })
  ).toHaveCount(0);

  // Check completed functionality
  await page
    .locator("#completed-section")
    .getByRole("listitem")
    .filter({ hasText: "atomic habit" })
    .getByRole("button", { name: "To-Read" })
    .click();
  await expect(
    page
      .locator("#completed-section")
      .getByRole("listitem")
      .filter({ hasText: "atomic habit" })
  ).toHaveCount(0);

  // Check Delete functionality
  await page
    .locator("#to-read-section")
    .getByRole("listitem")
    .filter({ hasText: "atomic habit" })
    .getByRole("button", { name: "Delete" })
    .click();
  await expect(
    page
      .locator("#to-read-section")
      .getByRole("listitem")
      .filter({ hasText: "atomic habit" })
  ).toHaveCount(0);
  await expect(
    page
      .getByText("atomic habit")
  ).toHaveCount(0);
});
