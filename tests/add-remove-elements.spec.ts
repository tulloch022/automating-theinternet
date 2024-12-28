import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });


test.describe('Add/Remove Elements', () => {
    test('Add/Remove Elements button should add an element', async ({ page }) => {
        // Click the link to navigate to the Add/Remove Elements page
        const link = page.getByText('Add/Remove Elements');
        await link.click()

        // Verify the header of the Add/Remove Elements page is visible
        const header = page.getByRole('heading', {name: 'Add/Remove Elements'})
        await expect(header).toBeVisible();

        // Click the "Add Element" button
        const addElementButton = page.getByText('Add Element');
        await addElementButton.click();

        // Verify the "Delete" button is visible
        const deleteButton = page.getByText('Delete');
        await expect(deleteButton).toBeVisible();
    })
})