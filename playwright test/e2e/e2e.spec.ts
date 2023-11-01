import { expect } from '@playwright/test';
import { chromium } from 'playwright';

(async () => {
  // Launch a Chromium browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to your Next.js project's URL (replace with your actual URL)
  await page.goto('http://localhost:3000'); // Replace with the correct URL

  // Wait for the "To-Read Books List" section to load
  await page.waitForSelector('#to-read-section');

  // Click the "Reading" button on the first book in the "To-Read" section
  await page.click('#to-read-section button[data-action="reading"]');

  // Wait for the book to move to the "In-Progress" section
  await page.waitForSelector('#in-progress-section');

  // Assert that the book is now in the "In-Progress" section
  const inProgressBook = await page.$('#in-progress-section li');
  expect(inProgressBook).not.toBeNull();

  // Capture a screenshot (optional)
  await page.screenshot({ path: 'book-page.png' });

  // Close the browser
  await browser.close();
})();
