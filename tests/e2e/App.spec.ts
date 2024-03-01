import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
    // ... you'd put it here.
    // TODO: Is there something we need to do before every test case to avoid repeating code?
  })

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see a username and password prompt', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page.locator('input#username')).toBeVisible();
  await expect(page.locator('input#password')).toBeVisible();
  await expect(page.locator('button:has-text("Login")')).toBeVisible();
});

test('on page load, i dont see a username and password prompt', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  // checks if username and password inputs are not visible initially
  await expect(page.locator('input#username')).not.toBeVisible();
  await expect(page.locator('input#password')).not.toBeVisible();
  // checks what happens when clicking the login button without entering credentials
  await page.locator('button:has-text("Login")').click();
 // checks if the error message is displayed
 await expect(page.locator('div.error')).toHaveText('Error: Invalid username or password. Password must be at least 8 characters long');
});

test('after successful login, a command bar appears', async ({ page }) => {
  await page.goto('http://localhost:8000/login');
  await page.fill('input#username', 'your_username');
  await page.fill('input#password', 'your_password');
  await page.click('button:has-text("Login")');
  await page.waitForSelector('div.command-bar');
  await expect(page.locator('div.command-bar')).toBeVisible();
});

test('after command bar appears, give it a load_csv command', async ({ page }) => {
  await page.goto('http://localhost:8000/login');
  await page.fill('input#username', 'your_username');
  await page.fill('input#password', 'your_password');
  await page.click('button:has-text("Login")');
  await page.waitForSelector('div.command-bar');
  await page.fill('input.command-input', 'load_csv filename.csv');
  await page.keyboard.press('Enter');
});

test('after giving load_csv command, verify dataset loading status', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.fill('input#username', 'your_username');
  await page.fill('input#password', 'your_password');
  await page.click('button:has-text("Login")');
  await page.waitForSelector('input[placeholder="Enter command..."]');
  await page.fill('input[placeholder="Enter command..."]', 'load_csv mocked_data');
  await page.press('input[placeholder="Enter command..."]', 'Enter');
  await page.waitForSelector('.history div');
  const historyText = await page.textContent('.history div');
  expect(historyText).toContain('Dataset loaded successfully');
  expect(historyText).toContain('Error: No dataset loaded or dataset is empty.')

});

test('after loading dataset, verify view command outputs table of dataset', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.fill('input#username', 'your_username');
  await page.fill('input#password', 'your_password');
  await page.click('button:has-text("Login")');
  await page.waitForSelector('input[placeholder="Enter command..."]');
  await page.fill('input[placeholder="Enter command..."]', 'load_csv mocked_data');
  await page.press('input[placeholder="Enter command..."]', 'Enter');
  await page.waitForSelector('table');
  await page.fill('input[placeholder="Enter command..."]', 'view');
  await page.press('input[placeholder="Enter command..."]', 'Enter');
  await page.waitForSelector('.csv-viewer');
  const datasetView = await page.$('.csv-viewer');
  expect(datasetView).not.toBeNull();
});

test('after logging in, load_csv, view dataset, and search for value', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.fill('input#username', 'your_username');
  await page.fill('input#password', 'your_password');
  await page.click('button:has-text("Login")');
  await page.waitForSelector('input[placeholder="Enter command..."]');
  await page.fill('input[placeholder="Enter command..."]', 'load_csv mocked_data');
  await page.press('input[placeholder="Enter command..."]', 'Enter');
  await page.waitForSelector('table');
  const datasetTable = await page.$('table');
  expect(datasetTable).not.toBeNull();
  await page.fill('input[placeholder="Enter command..."]', 'view');
  await page.press('input[placeholder="Enter command..."]', 'Enter');
  await page.waitForSelector('.csv-viewer');
  const datasetView = await page.$('.csv-viewer');
  expect(datasetView).not.toBeNull();
  await page.fill('input[placeholder="Enter command..."]', 'search 0 Apple');
  await page.press('input[placeholder="Enter command..."]', 'Enter');
  await page.waitForSelector('.history div');
  const searchResult = await page.$('.history div');
  expect(searchResult).not.toBeNull();
});