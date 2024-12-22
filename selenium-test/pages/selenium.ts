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
  private readonly expectedTitle: string;
  private readonly alertBtn: Locator;
  private readonly expectedTitle2: string;
  public newPage!: Page;

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
    this.expectedTitle = this.testData[7].expectedh1![0];
    this.alertBtn = page.locator(this.testData[8].locator![0]);
    this.expectedTitle2 = this.testData[8].expectedh1![0];

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
    await this.page.waitForTimeout(1000);//added time out 'cause it was failing 
    return await this.expectedElement.isVisible();
  }

  async openNewTab() {
    this.newPage = await this.context.newPage();
    await this.newPage.waitForLoadState();
    await this.newPage.goto(this.baseURL);
    return await this.newPage.url() === this.baseURL;
  }

  async navigateToClickTestAndClick() {
    await this.newPage.locator(this.testData[6].locator![0]).first().click();
    await this.newPage.locator(this.testData[7].locator![0]).click();
    return await this.newPage.locator('h1', { hasText: this.expectedTitle }).isVisible();
  }

  async interactionWithNewTab(){
    await this.newPage.locator(this.testData[8].locator![0]).first().click();
    return await this.newPage.locator('h1', { hasText: this.expectedTitle2 }).isVisible()
  }

}