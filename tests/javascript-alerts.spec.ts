import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });


test('JS alert buttons trigger expected alerts', async ({ page }) => {
    // Click the link to navigate to the JS alerts page
    const link = page.getByText('JavaScript Alerts');
    await link.click();

    // Verify URL and header
    await expect(page).toHaveURL(/javascript_alerts/);
    const header = page.getByRole('heading', {name: 'JavaScript Alerts'});
    await expect(header).toBeVisible();

    // Click JS Alert button and check for success
    const alertButton = page.getByText('Click for JS Alert');
    await alertButton.click();
    const success = page.getByText('You successfully clicked an alert');
    await expect(success).toBeVisible();

    // Click JS Confirm button, cancel it, and confirm cancelled
    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe('I am a JS Confirm');
        await dialog.dismiss();
    });
    const confirmButton = page.getByText('Click for JS Confirm');
    await confirmButton.click();
    const cancellation = page.getByText('You clicked: Cancel');
    await expect(cancellation).toBeVisible();

    // Click JS Prompt button, enter text, click ok, and confirm text is on page
    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe('I am a JS prompt');
        await dialog.accept('Kevin');
    });
    const promptButton = page.getByText('Click for JS Prompt');
    await promptButton.click();
    const entered = page.getByText(/You entered: Kevin/);
    await expect(entered).toBeVisible();
})