import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });


test('File Upload link should navigate to file uploader page and receive uploaded file', async ({ page })=> {
    // Click the link to navigate to the file upload page
    const link = page.getByText("File Upload");
    link.click()

    // Verify the URL, header, and that the file uploader components are there
    await expect(page).toHaveURL(/upload/);
    const header = page.getByRole('heading', {name: 'File Uploader'});
    await expect(header).toBeVisible();
    const chooseFileButton = page.locator('#file-upload');
    await expect(chooseFileButton).toBeVisible();
    const uploadButton = page.locator('#file-submit');
    await expect(uploadButton).toBeVisible();
    const dragDrop = page.locator('#drag-drop-upload');
    await expect(dragDrop).toBeVisible();

    // Select a file and click upload
    await chooseFileButton.setInputFiles('automating-theinternet/tests/assets/file.txt')
    await uploadButton.click();

    // Verify correct file was uploaded
    const uploadHeader = page.getByRole('heading', {name: 'File Uploaded!'});
    await expect(uploadHeader).toBeVisible();
    const uploadedFile = page.locator('#uploaded-files');
    await expect(uploadedFile).toBeVisible();
    await expect(uploadedFile).toHaveText('file.txt');
})