import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
  } from "selenium-webdriver";
  import { BasePage } from "./BasePage";

  export class SmartLinkPage extends BasePage {
      // input fields for adding a new user:
      new_username: By = By.name("form[new_contact][username]");
      // check availability button
      new_password: By = By.name("form[new_contact][password]");
      new_confirmPwd:By = By.name("form[new_contact][confim_password]");
      new_pin:By = By.name("form[new_contact][alarm_user_pin]");
      new_verbalPwd:By = By.name("form[new_contact][verbal_password]");

  }