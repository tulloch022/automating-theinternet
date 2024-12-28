import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });


test('dropdown link should navigate to dropdown page and update selected value', async ({ page }) => {
    // Click the link to navigate to the dropdown page 
    const link = page.getByText("Dropdown");
    await link.click();

    // Verify we are on the dropdown page and the dropdown exists
    await expect(page).toHaveURL(/dropdown/);
    const header = page.getByRole('heading', {name: 'Dropdown List'})
    await expect(header).toBeVisible();
    const dropdown = page.locator("#dropdown");
    await expect(dropdown).toBeVisible();

    // Select an option and verify the selected value is updated
    await dropdown.selectOption("2");
    await expect(dropdown).toHaveValue("2");
})