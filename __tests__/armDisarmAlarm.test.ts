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
        page.driver.quit();
    });
// Set up the chrome brwoser, and login to the website.
    test("Navigate to Smartlink and Login", async () => {
        await page.login();
        
    });
// Get the current status of the alarm system and act on it.
    test("Get the panel status and either arm or disarm.", async () => {
        jest.setTimeout(80000);
        var currentStatus = await page.getText(page.panelStatus);
        //expect(currentStatus).toBe("Disarmed" || "Armed Away" || "Armed Stay");
        expect(currentStatus == "Disarmed" || "Armed Stay");
        console.log("The panel is currently " + currentStatus);
        if (currentStatus == "Disarmed") {
            await page.clickArmingButton();
            var currentStatus = await page.getText(page.panelStatus);
            expect(currentStatus).toEqual("Armed Stay");
            return console.log("The panel is now Armed!");
        } else 
            await page.clickDisarmButton();
            var currentStatus = await page.getText(page.panelStatus);
            expect(currentStatus).toEqual("Disarmed");
            return console.log("The panel is now Disarmed!");
        
    });

// Now that you have done one part of the test, do the opposite
    test("Arm or disarm the panel again.", async () => {
        jest.setTimeout(80000);
        var currentStatus = await page.getText(page.panelStatus);
        //expect(currentStatus).toBe("Disarmed" || "Armed Away" || "Armed Stay");
        expect(currentStatus == "Disarmed" || "Armed Stay");
        console.log("The panel is currently " + currentStatus);
        if (currentStatus == "Disarmed") {
            await page.clickArmingButton();
            var currentStatus = await page.getText(page.panelStatus);
            expect(currentStatus).toEqual("Armed Stay");
            console.log("The panel is now Armed!");
        } else 
            await page.clickDisarmButton();
            var currentStatus = await page.getText(page.panelStatus);
            expect(currentStatus).toEqual("Disarmed");
            console.log("The panel is now Disarmed!");
        
    });

// At this point, we have armed and disarmed. Now make sure to 
// leave the panel n a disarmed state before finishing the test.
    test("Make sure the panel is disarmed.", async () => {
        jest.setTimeout(80000);
        var currentStatus = await page.getText(page.panelStatus);
        if (currentStatus == "Disarmed") {
           return console.log("All done here.");
        }
        else 
            await page.clickDisarmButton();
            var currentStatus = await page.getText(page.panelStatus);
            expect(currentStatus).toEqual("Disarmed");
            return console.log("The panel is Disarmed now. Go have a beer.");
    });
    
});