import { SSL_OP_EPHEMERAL_RSA } from "constants";
import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
  } from "selenium-webdriver";
import { textChangeRangeIsUnchanged } from "typescript";
  import {BasePage} from "./BasePage";

  export class SmartLinkPage extends BasePage {
      // Login Page Elements:
      // login page logo
      headerLogo: By = By.className("lite-site-banner-image-010");
      // username input field
      username:By = By.id("user-name");
      // password input field
      password:By = By.name("form[password]");
      // button to submit username/password and log in
      log_in:By = By.id("submit");
      // Landing Page Elements:
      // flag that navigation index is visible
      listIsVisible:By = By.className("lite-menu-login-status-item-box lite-welcome-msg");
      // Button to navigate to account page
      userNavButton: By = By.xpath("//td[text,'Users']");
      // User Page Elements:
      // input fields for adding a new user:
      new_username: By = By.name("form[new_contact][username]");
      // check availability button
      new_password: By = By.name("form[new_contact][password]");
      new_confirmPwd:By = By.name("form[new_contact][confim_password]");
      new_pin:By = By.name("form[new_contact][alarm_user_pin]");
      new_verbalPwd:By = By.name("form[new_contact][verbal_password]");
      // Added by Steven Cooper 1/5/2021 to get panel status
      panelStatus:By = By.xpath('//div[@id="panel_status"]//p[@class="_4 panelStatus"]');
      // Added by Steven Cooper 1/6/2021 to get arm/disarm buttons.
      armAwayButton:By = By.xpath('//img[@id="armedAway_icon"]');
      disarmButton:By = By.xpath('//img[@id="disarm_icon"]');
      // Added by Steven Cooper 1/6/2021 to catch arming icon.
      armingIcon:By = By.xpath('//img[@id="arming_icon"]');
      // Built this function to sleep for a while before checking
      // If the panel is armed. Steven Cooper 1/6/2021
      sleep(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms));
      };
      // constructor
      constructor(options) {
        super(options);
        this.url =
          "https://smartlink.secure.direct/7.95/html/login.php";
      }
      async navigate() {
        await this.driver.get(this.url);
        await this.driver.wait(
          until.elementIsEnabled(await this.getElement(this.headerLogo))
        );
      }
      /**
       * This function gets a web page element, clicks it, and enters
       * user-designated text.
       * 
       * @param element - Element that will receive text
       * @param input - text to be entered into the element
       */
      async clickAndEnter(element:By, input:string) {
        await this.getElement(element);
        await this.click(element);
        await this.setInput(element, input);
      }
      
      async login() {
          // Navigate to login page
          await this.navigate();
          // Enter username
          await this.clickAndEnter(this.username, "hw120120");
          // Enter password
          await this.clickAndEnter(this.password, "123456");
          // Click "login" to submit username and password
          await this.getElement(this.log_in);
          await this.click(this.log_in);
      }
      
      
      // Built this to click the arm button.
      // Steven Cooper 1/6/20201
      async clickArmingButton() {
        await this.getElement(this.armAwayButton);
        await this.click(this.armAwayButton);
        await this.getElement(this.armingIcon);
        await this.sleep(60000);
        //await this.getElement(this.disarmButton);
      }

      // Built this to click the disarm button.
      // Steven Cooper 1/6/2021
      async clickDisarmButton() {
        await this.getElement(this.disarmButton);
        await this.click(this.disarmButton);
        await this.sleep(5000);
        //await this.getElement(this.armAwayButton);
      }
      // Built this to return the panel status to me outside 
      // of a test on my test page. Steven Cooper 1/6/2021
      async getPanelStatus() {
        var currentStatus = await this.getText(this.panelStatus);
        return currentStatus;
      }

  }