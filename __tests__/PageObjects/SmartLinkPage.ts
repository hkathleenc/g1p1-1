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

  }