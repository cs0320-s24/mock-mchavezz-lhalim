import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */


test('on page load, i see a username and password prompt', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page.locator('input#username')).toBeVisible();
  await expect(page.locator('input#password')).toBeVisible();
  await expect(page.locator('button:has-text("Login")')).toBeVisible();
});

test('able to log in using credentials', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.fill('input#username', 'your_username');
  await page.fill('input#password', 'your_password');
  await page.click('button:has-text("Login")');
  console.log('Current URL:', page.url());
  await page.waitForTimeout(1000);
  expect(page.url()).toBe('http://localhost:8000/');
});

test('after logging in, command bar appears', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.fill('input#username', 'your_username');
  await page.fill('input#password', 'your_password');
  await page.click('button:has-text("Login")');
  await page.waitForTimeout(1000);
  const commandBarLabelText = 'Enter command...';
  const commandBarLabel = await page.$(`text="${commandBarLabelText}"`);
});
  
test('after command bar appears, give it a load_csv command', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.fill('input#username', 'your_username');
  await page.fill('input#password', 'your_password');
  await page.click('button:has-text("Login")');
  await page.waitForTimeout(1000);
  await page.fill('input[type="text" i]', 'load_csv ');
  await page.keyboard.press('Enter');
});

// this test runs, but the current dataset filepath text is linked to the about us part of the html
// so it fails 
test('after giving load_csv command, verify dataset loading status', async ({ page }) => {
  await page.goto('http://localhost:8000/login');
  await page.fill('input#username', 'your_username');
  await page.fill('input#password', 'your_password');
  await page.click('button:has-text("Login")');
  await page.waitForTimeout(1000);
  await page.fill('input[type="text" i]', 'load_csv mocked_data');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  await page.waitForSelector('h2');
  const h2 = await page.textContent('h2');
  expect(h2).toContain('Current Dataset Filepath:');
});


test('after loading dataset, verify view command outputs table of dataset', async ({ page }) => {
  await page.goto('http://localhost:8000/login');
  await page.fill('input#username', 'your_username');
  await page.fill('input#password', 'your_password');
  await page.click('button:has-text("Login")');
  await page.waitForTimeout(1000);
  await page.fill('input[type="text" i]', 'load_csv mocked_data');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  await page.fill('input[type="text" i]', 'view');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  await page.waitForSelector('.csv-viewer td');
  const datasetTable = await page.$('.csv-viewer td');
  expect(datasetTable).not.toBeNull();
});




