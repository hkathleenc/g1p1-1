import { BasePage } from "./BasePage";
import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
} from "selenium-webdriver"; 
import { SmartLinkPage } from "./SmartLinkPage";
const chromedriver = require("chromedriver");
const driver: WebDriver = new Builder()
.withCapabilities(Capabilities.chrome())
.build()
    const smart = new SmartLinkPage(driver)
    

    beforeEach(async ()=>{
        await smart.navigate();
    });
    test("Can load SmartLink", async ()=> {
        expect(await smart.click(smart.username ,))
        expect(await smart.click(smart.password, ))
        
            console.log("You found it!")
        
    });
    test("Can Log into SmartLink", async ()=> {
        await smart.setInput(smart.log_in, "HW120120");
        await smart.setInput(smart.password, "123456");
        await 
        await smart.click (smart.log_in, );
            console.log("You made it! Welcome to the Party! ")
    })
