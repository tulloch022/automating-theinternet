import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });


test('Checkbox behavior is accurate and consistent', async ({ page }) => {
    // Click the link to navigate to the checkboxes page
    const link = page.getByText('Checkboxes');
    await link.click();

    // Verify URL and presence of header and checkboxes
    await expect(page).toHaveURL(/checkboxes/);
    const header = page.getByRole('heading', {name: 'Checkboxes'});
    await expect(header).toBeVisible();
    const checkbox1label = page.getByText('checkbox 1');
    const checkbox2label = page.getByText('checkbox 2');
    await expect(checkbox1label).toBeVisible();
    await expect(checkbox2label).toBeVisible();

    // Click checkbox 1 and checkbox 2 and confirm toggling
    const checkboxes = page.locator('#checkboxes input[type="checkbox"]')
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).uncheck();
    await expect(checkboxes.nth(0)).toBeChecked();
    await expect(checkboxes.nth(1)).not.toBeChecked();
})