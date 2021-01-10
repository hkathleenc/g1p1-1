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
      await driver.get('https://smartlink.secure.direct/7.95/html/login.php')
      
     await page.clickAndEnter(page.username, "hw120120");
        // Enter password
        await page.clickAndEnter(page.password, "123456");
        await page.click(page.log_in)
        await page.driver.wait(
          until.elementIsEnabled(await page.getElement(page.menuButtons)))
        await page.click(page.menuButtons);
      })
    })    
  
  
