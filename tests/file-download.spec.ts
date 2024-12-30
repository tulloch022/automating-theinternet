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

    // Click canvas image link and confirm download
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByText('canvas_image.png').click()
    ]);

    const targetPath = path.resolve(__dirname, 'assets/test.png');
    await download.saveAs(targetPath);

    const fileExists = fs.existsSync(targetPath);
    expect(fileExists).toBeTruthy();

    // Delete the file after verificatiom
    fs.unlinkSync(targetPath);
})