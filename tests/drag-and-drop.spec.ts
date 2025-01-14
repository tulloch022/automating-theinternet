import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });

test('should swap positions of boxes', async ({ page }) => {
    // Click the link to navigate to the dropdown page 
    const link = page.getByText("Drag and Drop");
    await link.click();
  
    // Select the elements to drag and drop
    const boxA = page.locator('#column-a');
    const boxB = page.locator('#column-b');
  
    // Perform the drag-and-drop action
    await boxA.dragTo(boxB);
  
    // Verify that the boxes have swapped positions
    const boxAText = await boxA.textContent();
    const boxBText = await boxB.textContent();
    
    expect(boxAText).toBe('B');
    expect(boxBText).toBe('A');
  });