import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
} from "selenium-webdriver";
import {SmartLinkPage} from "./PageObjects/SmartLinkPage";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

  describe("Login and Logout funtionality works", () => {
    const page = new SmartLinkPage({ browser: "chrome" })

    test('SmartLink login', async () => {
      await page.driver.get(page.url)
    //await page.driver.wait(until.elementLocated(By. className("lite-site-banner-image-010")))
    await page.clickAndEnter(page.username, "hw120120");
    // Enter password
    await page.clickAndEnter(page.password, "123456");
    await page.click(page.log_in)
    await page.driver.sleep(5000)
      })

      test('SmartLink logout', async () => {
        await page.click(page.menuButtons)
        await page.driver.sleep(1000)
        await page.click(page.logout)
        await page.driver.sleep(5000)
      });
    })    
  
  
