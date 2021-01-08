import { Builder, By, until, WebElement, Capabilities, WebDriver } from "selenium-webdriver"

const chromedriver = require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()
import {SmartLinkPage} from "./SmartLinkPage";
export class BasePage {
    url = "https://smartlink.secure.direct/7.95/html/login.php"
    driver: WebDriver
    username:By = By.id("user-name");
    password:By = By.name("form[password]");
     headerLogo: By = By.className("lite-site-banner-image-010")
    menuIcon: By = By.xpath('//div[@class = "icon menuIcon"]')
    logout: By = By.xpath('//a[text()= "Logout"]')

    
    
 constructor(url?: string, driver?: WebDriver) {
        if (url) this.url = url
        if (driver) this.driver = driver
        else this.getDriver
    }
    getDriver() {
        if (this.driver)
        return this.driver
        else
        return new Builder().withCapabilities(Capabilities.chrome()).build()
    }
    async getElement(elementBy: By): Promise<WebElement> {
        await this.driver.wait(until.elementLocated(elementBy));
        let element = await this.driver.findElement(elementBy);
        await this.driver.wait(until.elementIsVisible(element));
        return element;
      }
    async navigate() {
        await this.driver.get(this.url)
        await this.driver.wait(
            until.elementIsEnabled(await this.getElement(this.headerLogo))
          );
        }
    /**
     * clicks the given element after waiting for it
     * @param {By} elementBy - the locator for the element to click
     */
    async click(elementBy: By): Promise<void> {
      let element = await this.getElement(elementBy);
      await this.driver.wait(until.elementLocated(elementBy));
      return await element.click();
    }
    /**
     * clears the given element after waiting for it, and then sends the provided keys
     * @param {By} elementBy - the locator for the element to clear and sendKeys to
     * @param {any} keys - the string or list of keys to send
     */
    async setInput(elementBy: By, keys: any): Promise<void> {
      let input = await this.getElement(elementBy);
      await this.driver.wait(until.elementIsEnabled(input));
      await input.clear();
      return input.sendKeys(keys);
    }
  }



