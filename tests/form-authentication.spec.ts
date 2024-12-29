import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });


test('entering valid form credentials should navigate to secure area and logout button should logout', async ( { page }) => {
    // Click the link to navigate to the Form Authentication page
    const link = page.getByText('Form Authentication');
    await link.click();

    // Verify URL and header
    await expect(page).toHaveURL(/login/);
    const header = page.getByRole('heading', {name: 'Login Page'});
    await expect(header).toBeVisible();

    // Fill in the username and password fields with valid credentials and click login
    const username = page.locator('#username');
    await username.fill('tomsmith');
    const password = page.locator('#password');
    await password.fill('SuperSecretPassword!');
    const loginButton = page.locator('button, input[type="submit"]')
    await loginButton.click();

    // Verify successful navigation to secure area
    await expect(page).toHaveURL(/secure/);
    const successBanner = page.locator('#flash');
    await expect(successBanner).toBeVisible();

    // Click logout button and confirm successful logout
    const logoutButton = page.getByRole('link', {name: 'Logout'});
    await logoutButton.click();
    const logoutSuccess = page.locator('#flash');
    await expect(logoutSuccess).toBeVisible();
})