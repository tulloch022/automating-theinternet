import { test, expect } from '@playwright/test';



test('should display success message with valid digest credentials', async ({ browser }) => {
    // Create new browser context with valid credentials and navigate to webpage
    const context = await browser.newContext({
        httpCredentials: {
          username: 'admin',
          password: 'admin',
        },
      });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/');
    

    // Click the link to navigate to the digest authentication page
    const link = page.getByText('Digest Authentication');
    await link.click();

    // Verify successful message is displayed
    const header = page.getByRole('heading', {name: "Digest Auth"});
    await expect(header).toBeVisible();
    const message = page.getByRole('paragraph');
    await expect(message).toHaveText(/Congratulations!/);


    // Close context
    await context.close();
});