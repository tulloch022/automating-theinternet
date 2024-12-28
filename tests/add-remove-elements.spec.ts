import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });


test.describe('Add/Remove Elements', () => {
    test('Add/Remove Elements link should bring me to Add/Remove Elements page', async ({ page }) => {
        const link = page.getByText('Add/Remove Elements');
        await link.click()
        const header = page.getByRole('heading', {name: 'Add/Remove Elements'})
        await expect(header).toBeVisible();
        const addElementButton = page.getByText('Add Element');
        await addElementButton.click();
        const deleteButton = page.getByText('Delete');
        await expect(deleteButton).toBeVisible();
    })
})