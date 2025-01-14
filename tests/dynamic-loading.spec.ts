import { test, expect } from '@playwright/test'


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });


test('hidden content should appear after loading', async ({ page }) => {
    // Click the link to navigate to the dynamic loading page 
    const link = page.getByText("Dynamic Loading");
    await link.click();

    // Click the link to go to example ine
    const link1 = page.getByText("Example 1");
    await link1.click();
  
    // Click the "Start" button to begin loading
    await page.click('button');
  
    // Wait for the loading spinner to disappear
    await page.locator('#loading').waitFor({ state: 'hidden' });
  
    // Assert that the dynamically loaded content is visible
    const dynamicContent = page.locator('#finish');
    await expect(dynamicContent).toBeVisible();
    await expect(dynamicContent).toHaveText('Hello World!');
  });