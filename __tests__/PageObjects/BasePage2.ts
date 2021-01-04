import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
  } from "selenium-webdriver";
  import { elementLocated } from "selenium-webdriver/lib/until";
  const chromedriver = require("chromedriver");

async getElement(elementBy: By): Promise<WebElement> {
    await this.driver.wait(until.elementLocated(elementBy));
    let element = await this.driver.findElement(elementBy);
    await this.driver.wait(until.elementIsVisible(element));
    return element;
}

async click(elementBy: By): Promise<void> {
    let element = await this.getElement(elementBy);
    await this.driver.wait(until.elementIsEnabled(element));
    return await element.click();
}
This methods helped me
async selectSignIn(): Promise<void> {
    await this.click(this.signIn)
}
async inputUserName(username: string): Promise<void> {
    let input = await this.getElement(this.username);
    await this.driver.wait(until.elementIsEnabled(input));
    return input.sendKeys(username)
}