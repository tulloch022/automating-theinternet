import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });


test('message should appear and be valid', async ({ page }) => {
    // Click the link to navigate to the key presses page
    const link = page.getByText('Notification Messages');
    await link.click();

    // Wait for the notification to appear
    const notification = page.locator('#flash');
    await expect(notification).toBeVisible();
  
    // List of expected messages
    const expectedMessages = [
      'Action successful',
      'Action unsuccesful, please try again',
      'Action not successful'
    ];
  
    // Verify that the notification message matches one of the expected values
    const notificationText = await notification.textContent();
    const sanitizedText = notificationText
    .replace(/[\n\r]+/g, '') // Remove new lines
    .replace(/×/, '')        // Remove '×'
    .trim();                 // Remove any remaining whitespace
    expect(expectedMessages).toContain(sanitizedText);
  });