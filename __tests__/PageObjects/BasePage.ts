import { Builder, By, until, WebElement, Capabilities, WebDriver } from "selenium-webdriver"
const chromedriver = require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()
class Basepage {
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
    async navigate() {
        await this.driver.get(this.url)
        await this.driver.wait(
            until.elementIsEnabled(await this.getElement(this.headerLogo))
          );
        }
    }



