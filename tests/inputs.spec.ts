import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });



test('number input accepts numbers, doesnt accept non-numbers, and incrementor works', async ({ page }) => {
    // Click link to navigate to inputs page
    const link = page.getByText('Inputs');
    await link.click();

    // Verify URL, header
    await expect(page).toHaveURL(/inputs/);
    const header = page.getByRole('heading', {name: 'Inputs'});
    await expect(header).toBeVisible();

    // Focus and press key to increment number input by 1 and verify value
    const input = page.locator('input[type="number"]');
    await input.focus();
    await input.press('ArrowUp');
    await expect(input).toHaveValue('1');

    // Type additional number and confirm updated value
    await input.press('Digit5');
    await expect(input).toHaveValue('15');

    // Type letter and confirm value doesnt change
    await input.press('KeyA');
    await expect(input).toHaveValue('15');
})