import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
} from "selenium-webdriver"; 
import { SmartLinkPage } from "./PageObjects/SmartLinkPage";
import { Console } from "console";
const chromedriver = require("chromedriver");
const driver: WebDriver = new Builder()
.withCapabilities(Capabilities.chrome())
.build()
    const smart = new SmartLinkPage(driver);
    afterAll(async ()=> {
        
    
    });
    test("Can Log into SmartLink and find UserPage", async ()=> {
        await(smart.initUserPage());
        //The above method will start the enitre process of, nav to login screen, 
        //to input login ifo, nav to menu, and will find the user page.
        console.log("You did it! You found the User Page!");
    });
   test("Adding new user inforamtion", async()=> {
       await(smart.click(smart.addUser));
       //This will click add new user.
       await(smart.clickAndEnter(smart.Name, "Lisa Sherwood"));
       // This will input Lisa in to the name
        await(smart.clickAndEnter(smart.new_username, "Hag134" ));
        // This will give her the Username 
       
        console.log("The Hag is the almost ready.");
   });
   test("Adding a new user pt2", async ()=> {
       await(smart.driver.sleep(5000))
    await(smart.clickAndEnter(smart.new_password, "DBD666"));
        // This inputs the new password
    await(smart.clickAndEnter(smart.new_confirmPwd, "DBD666"));
    //This confirms the new password
    await(smart.clickAndEnter(smart.new_pin, "6464"));
    // This put in the pin, this filled is required
    await(smart.clickAndEnter(smart.new_verbalPwd, "The Hag"));
    // The verbal password is also a required filled, this puts in the verbal password.
    console.log("The Hag is the Killer.")
    //await(smart.click(smart.saveNewUser));
    // When this is not commmeted out, this will click the add button to save the new user. 
    console.log("The Hag was Created")
    
   });

