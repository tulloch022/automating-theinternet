import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });



test('File Download page should navigate correctly and links should download expected file', async ({ page }) => {
    // Click link to navigate to File Download page
    const link = page.getByText('File Download', {exact: true});
    await link.click();

    // Confirm URL, header
    await expect(page).toHaveURL(/download/);
    const header = page.getByRole('heading', {name: 'File Downloader'});
    await expect(header).toBeVisible();

    // Locate all file links on the page
    const fileLinks = page.locator('a[href*="."]'); // Select links containing a file extension
    const fileCount = await fileLinks.count();

    // Ensure there is at least one file link on the page
       expect(fileCount).toBeGreaterThan(0);

    // Select the last file link
    const firstFileLink = fileLinks.nth(1);
    const fileName = await firstFileLink.textContent();


    const [download] = await Promise.all([
        page.waitForEvent('download'),
        firstFileLink.click()
    ]);

    const targetPath = path.resolve(__dirname, `assets/${fileName}`);
    await download.saveAs(targetPath);

    const fileExists = fs.existsSync(targetPath);
    expect(fileExists).toBeTruthy();

    // Delete the file after verificatiom
    fs.unlinkSync(targetPath);
})