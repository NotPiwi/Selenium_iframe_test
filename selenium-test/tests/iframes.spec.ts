import { test, expect } from '@playwright/test';
import { Selenium } from '../pages/selenium';

test.describe('Interact with iframe and navigate to another page', () => {
  test('Complete interaction as described in test data', async ({ page }) => {

    const selenium = new Selenium(page);

    await selenium.navigate();

    expect(await selenium.interactWithIframeFields()).toBeTruthy();
    expect(await selenium.submitInteraction()).toBeTruthy();

    expect(await selenium.openNewTab()).toBeTruthy();
    
  });
});