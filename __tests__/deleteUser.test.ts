/* 
Author: Helen Cunningham
Written: 01/02/21

Tests user's ability to successfully delete a sub-user. 
Handles cases:
    1. User deletes one sub-user 
    2. User starts to delete a sub-user from the account, and cancels the process.

This test group uses SmartLinkPage.ts, which is a polymorphic class inheriting functionality from BasePage.ts.
*/

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


describe("User deletion works", () => {
    const page = new SmartLinkPage({ browser: "chrome" });
    afterAll(async () => {
        await page.driver.quit();
    });
    test("User can delete one sub-user account", async () => {
        /*
        Set up to delete a user:
            1. Log in to SmartLink account
            2. Go to Users Page:
                a. Check that list at right of page is visible.
                    i. If not, expand by clicking icon
                b. Click "Users" under account section
        */
        await page.navigate();
        await page.login();
    });
    test("User can cancel the deletion of one sub-user account", async () => {
        // Log in to SmartLink account
        await page.navigate();
        await page.login();
        // Go to Users Page 
    });
});