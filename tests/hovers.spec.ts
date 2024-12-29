import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });



test('hover over components produces expected elements on page', async ({ page }) => {
    // Click link to navigate to hovers page
    const link = page.getByText('Hovers');
    await link.click();

    // Confirm header and URL
    await expect(page).toHaveURL(/hovers/);
    const header = page.getByRole('heading', {name: 'Hovers'});
    await expect(header).toBeVisible();

    // Hover over first component and verify elements
    const avatars = page.locator('.figure');
    const firstAvatar = avatars.nth(0);
    await firstAvatar.hover();
    const name = page.getByText('name: user1');
    const profileLinks = page.getByText('View profile');
    await expect(name).toBeVisible();
    await expect(profileLinks.nth(0)).toBeVisible();

    // Hover over second component and verify elements
    const secondAvatar = avatars.nth(1);
    await secondAvatar.hover();
    const name2 = page.getByText('name: user2');
    await expect(name).not.toBeVisible();
    await expect(name2).toBeVisible()
    await expect(profileLinks.nth(0)).not.toBeVisible();
    await expect(profileLinks.nth(1)).toBeVisible();
})