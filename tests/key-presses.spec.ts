import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });



test('key presses should result in expect text on the page', async ({ page }) => {
    // Click the link to navigate to the key presses page
    const link = page.getByText('Key Presses');
    await link.click();

    // Verify URL, header
    await expect(page).toHaveURL(/key_presses/);
    const header = page.getByRole('heading', {name: 'Key Presses'});
    await expect(header).toBeVisible();

    // Press left key and confirm text on page
    const input = page.locator('#target');
    await input.press('ArrowLeft');
    const result = page.locator('#result');
    await expect(result).toHaveText('You entered: LEFT');

    // Press right key and confirm text on page
    const input1 = page.locator('#target');
    await input1.press('ArrowRight');
    const result1 = page.locator('#result');
    await expect(result1).toHaveText('You entered: RIGHT');

    // Press up key and confirm text on page
    const input2 = page.locator('#target');
    await input2.press('ArrowUp');
    const result2 = page.locator('#result');
    await expect(result2).toHaveText('You entered: UP');

    // Press down key and confirm text on page
    const input3 = page.locator('#target');
    await input3.press('ArrowDown');
    const result3 = page.locator('#result');
    await expect(result3).toHaveText('You entered: DOWN');
});