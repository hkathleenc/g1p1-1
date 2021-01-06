import { Builder, By, Capabilities, WebDriver } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()
class Basepage {
    url: string
    driver: WebDriver
    userName: By = By.css('#username')
    password: By = By.css('#password')
    logIn: By = By.css('#submit')
  
    constructor(url?: string, driver?: Webdriver) {
        if (url) this.https://smartlink.secure.direct/7.95/html/login.php = url
        if (driver) this.driver = driver
        else this.getDriver
    }
    getDriver() {
        if (this.driver)
        return this.driver
        else
        return new Builder().withCapabilities(Capabilities.chrome()).build()
    }
    async navigate() {
        await this.driver.get(this.url)
    }
}
test('SmartLink Login', async () => {
    await (await driver).get('https://smartlink.secure.direct/7.95/html/login.php')
    const userName: By = By.css('#username')
    const passWord: By = By.css('#password')
    const logIn: By = By.css('#submit')
   await (await driver).findElement(userName).sendKeys('hw120120')
   await (await driver).findElement(passWord).sendKeys('123456')
   await(await driver).findElement(logIn).click
   })

