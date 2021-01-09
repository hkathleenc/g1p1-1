import { SmartLinkPage } from "./PageObjects/SmartLinkPage";


describe("Creating a new user in Smartlink", () => {

    const page = new SmartLinkPage({ browser: "chrome" });
    afterAll(async () => {
        //await page.driver.close();
        page.driver.quit();
    });

    beforeEach(async ()=>{
        await page.navigate();
    });
    test("Can load SmartLink", async ()=> {
        expect(await page.click(page.username ,))
        expect(await page.click(page.password, ))
        
            console.log("You found it!")
        
    });
    test("Can Log into SmartLink", async ()=> {
        await page.setInput(page.log_in, "HW120120");
        await page.setInput(page.password, "123456");
        await page.click (page.log_in, );
            console.log("You made it! Welcome to the Party! ")
    })
});
