import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });

  test('should display the floating menu and stay visible while scrolling', async ({ page }) => {
    const link = page.getByText('Floating Menu');
    await link.click();

    // Verify the floating menu is visible
    const menu = page.locator('#menu');
    await expect(menu).toBeVisible();

    // Verify the floating menu is visible after scrolling
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(menu).toBeVisible();
  })
  
  test('should navigate to different pages when clicking menu buttons', async ({ page }) => {
    const link = page.getByText('Floating Menu');
    await link.click();

    // Verify each menu link navigates correctly
    const menuLinks = page.locator('#menu a');
    const sections = ['home', 'news', 'contact', 'about']; // Expected sections

    for (const section of sections) {
        const link = menuLinks.locator(`text=${section}`);
        await link.click();
        const currentURL = page.url();
        expect(currentURL).toContain(`#${section}`);
    }
});