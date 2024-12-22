import { FrameLocator, Locator, Page, BrowserContext } from '@playwright/test';
import testData from '../data/test-data.json';

export class Selenium {
  private readonly page: Page;
  private readonly context: BrowserContext;
  private readonly testData;
  private readonly baseURL: string;
  private readonly iframeLink: Locator;
  private readonly iframe: FrameLocator;
  private readonly emailField: Locator;
  private readonly ageField: Locator;
  private readonly email: string;
  private readonly age: string;
  private readonly submitBtn: Locator;
  private readonly expectedElement: Locator;
  private readonly newURL: string;

  constructor(page: Page) {
    this.page = page;
    this.context = page.context();
    this.testData = testData.testCase.steps;
    this.baseURL = this.testData[0].url!;
    this.iframeLink = this.page.locator(this.testData[1].locator![0]);
    this.iframe = this.page.frameLocator('iframe'),
    this.emailField = this.iframe.locator(this.testData[2].locator![0]);
    this.ageField = this.iframe.locator(this.testData[2].locator![1]);
    this.email = this.testData[2].userData![0];
    this.age = this.testData[2].userData![1];
    this.submitBtn = this.iframe.locator(this.testData[3].locator![0]);
    this.expectedElement = this.iframe.locator(this.testData[4].locator![0]);
    this.newURL = this.testData[5].url!;
  }

  async navigate() {
    await this.page.goto(this.baseURL);
    await this.iframeLink.click();
  }

  async interactWithIframeFields() {
    await this.emailField.fill(this.email);
    await this.ageField.fill(this.age);
    return (await this.emailField.inputValue() === this.email) && (await this.ageField.inputValue() === this.age);
  }

  async submitInteraction() {
    await this.submitBtn.click();
    await this.page.waitForTimeout(100);
    return await this.expectedElement.isVisible();
  }

  async openNewTab() {
    const newPage = await this.context.newPage();
    await newPage.waitForLoadState();
    await newPage.goto(this.testData[5].url!);
    return await newPage.url() === this.testData[5].url!;
  }
}