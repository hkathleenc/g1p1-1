// import {
//   Builder,
//   By,
//   Capabilities,
//   until,
//   WebDriver,
// } from "selenium-webdriver";
import {SmartLinkPage} from "./PageObjects/SmartLinkPage";

// const chromedriver = require("chromedriver");

// const driver: WebDriver = new Builder()
//   .withCapabilities(Capabilities.chrome())
//   .build();

// Steven Cooper commented out above code as it was redundant to what
// is in the describe function below and resolves issue with openning 
// two chrome driver sessions.

  describe("Login and Logout funtionality works", () => {
    const page = new SmartLinkPage({ browser: "chrome" })
    // Steven Cooper added afterAll function to tear down the 
    // webdriver once all async commands are executed/tests finished
    afterAll(async () => {
      page.driver.quit();
     });

    test('SmartLink login', async () => {
      await page.driver.get(page.url)
    //await page.driver.wait(until.elementLocated(By. className("lite-site-banner-image-010")))
    await page.clickAndEnter(page.username, "hw120120");
    // Enter password
    await page.clickAndEnter(page.password, "123456");
    await page.click(page.log_in)
    await page.driver.sleep(5000)
      })
      // Steven Cooper added an if to this test to see if the menu is visible. 
      // If it is visible 
      test('SmartLink logout', async () => {
        var isMenuVisible = await page.NavMenuDisplayed();
        console.log(isMenuVisible)
        if (isMenuVisible == true) {
          await page.click(page.logout)
          await page.driver.sleep(5000)
          return;
        }
        else await page.click(page.menuButtons)
        await page.driver.sleep(1000)
        await page.click(page.logout)
        await page.driver.sleep(5000)
      });
    })    
  
  
