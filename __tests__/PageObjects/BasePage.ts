import { Builder, By, until, WebElement, Capabilities, WebDriver } from "selenium-webdriver"
const chromedriver = require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()
const fs = require("fs")
export class BasePage {
    url = "https://smartlink.secure.direct/7.95/html/login.php"
    driver: WebDriver
    userName: By = By.id('#user-name')
    password: By = By.css('#password')
    logIn: By = By.css('#submit')
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
    /**
     * returns an element's text after waiting for it to be visible
     * @param {By} elementBy - the locator of the element to get text from
     */
    async getText(elementBy: By): Promise<string> {
      let element = await this.getElement(elementBy);
      await this.driver.wait(until.elementIsEnabled(element));
      return element.getText();
    }
    /**
     * returns an element's attribute value after waiting for the element to be visible
     * @param {By} elementBy - the locator of the element to get the value from
     * @param {string} attribute - the attribute to return the value from, such as 'value' or 'href'
     */
    async getAttribute(elementBy: By, attribute: string): Promise<string> {
      let element = await this.getElement(elementBy);
      await this.driver.wait(until.elementIsEnabled(element));
      return element.getAttribute(attribute);
    }
    /**
     * Will take a screenshot and save it to the filepath/filename provided.
     * Automatically saves as a .png file.
     * @param {string} filepath - the filepath relative to the project's base folder where you want the screenshot saved
     * @example
     * page.takeScreenshot("myFolder/mypic")
     * //picture saves in "myFolder" as "mypic.png"
     */
    async takeScreenshot(filepath: string) {
      fs.writeFile(
        `${filepath}.png`,
        await this.driver.takeScreenshot(),
        "base64",
        (e) => {
          if (e) console.log(e);
          else console.log("screenshot saved successfully");
          }
        )}
        
      
    async navigate() {
        await this.driver.get(this.url)
        await this.driver.wait(
            until.elementIsEnabled(await this.getElement(this.headerLogo))
          );
        }
    }



