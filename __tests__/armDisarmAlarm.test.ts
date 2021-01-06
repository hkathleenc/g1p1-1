    // File: armDisarmAlarm.test.ts
    // Author: Steven Cooper 

    // About: This test will log into the smartlink application
    // and attempt to arm and disarm the alarm system. There is 
    // a switch in this test so that the test will pass no matter 
    // the starting state of the alarm panel.

    // Credits: I am using ../PageObjects/SnartlinkPage.ts which 
    // was created by other members of my group which include 
    // Haley, Helen, and Anita.





import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
  } from "selenium-webdriver";
import { isComputedPropertyName } from "typescript";

  import {SmartLinkPage} from "./PageObjects/SmartLinkPage";
  
  const chromedriver = require("chromedriver");
  
  const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();


describe("Arming and Disarming the Alarm System", () => {
    const page = new SmartLinkPage({ browser: "chrome" });
    afterAll(async () => {
        //await page.driver.close();
        await page.driver.quit();
    });
// Set up the chrome brwoser, and login to the website.
    test("Navigate to Smartlink and Login", async () => {
        await page.login();
        
    });
// Get the current status of the alarm system for future 
// commands
    test("Get the panel status and store it as a string", async () => {
        const currentStatus = await page.getText(page.panelStatus);
        expect(currentStatus).toEqual("Disarmed" || "Armed Away" || "Armed Stay");
        console.log(currentStatus);
    });
// Need to add switch to disarm, arm, disarm the system...
    
    
});