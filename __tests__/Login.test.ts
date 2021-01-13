

import {SmartLinkPage} from "./PageObjects/SmartLinkPage";


  describe("Login and Logout funtionality works", () => {
    const page = new SmartLinkPage({ browser: "chrome" });
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

  
  });
});
