import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });

  test('Should navigate to the floating menu page and confirm menu is visible even when scrolling', async ({ page }) => {
    const link = page.getByText('Floating Menu');
    await link.click();
  })