import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
} from "selenium-webdriver";

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
    new_password: By = By.xpath('//input[@name = "form[new_contact][password]"]');
    new_confirmPwd:By = By.xpath('//input[@name = "form[new_contact][confirm_password]"]');
    new_pin:By = By.name("form[new_contact][alarm_user_pin]");
    new_verbalPwd:By = By.xpath('//input[@name="form[new_contact][verbal_password]"]');
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
    }
    // Account page URL
    accountURL: string = "https://smartlink.secure.direct/7.95/html/account_docs/account_lite_contacts.php";
    // Menu icon (expands navigation menu when clicked)
    menuIcon:By = By.css("div.icon.menuIcon");
    // Class of navigation button elements from drop-down list
    menuButtons:By = By.className("menu_row_box");
    // User Page Elements:
    // Individual user element
    indivUser:By = By.className("contactTop");
    // Deletion Confirmation Page:
    // Confirmation "Delete" button
    confirmDelete:By = By.xpath('//span[text()="Delete"]');
    // Added by Anita
    logout: By = By.xpath('//a[text()= "Logout"]');
    // Added by Haley
    Name: By = By.xpath('//input[@name="form[new_contact][name]"]');
    // This is to add a name to the new user, not a username.-HF
    addUser: By =By.xpath('//button[@name ="form[add_new_contact]"]');
    //This is to add a new user-HF
    saveNewUser: By = By.xpath('//button[@name="form[save_new_contact]"]')
  // This is to save the new user that was just created-HF
  
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
      await this.sleep(70000);
      //await this.getElement(this.disarmButton);
    }

    // Built this to click the disarm button.
    // Steven Cooper 1/6/2021
    async clickDisarmButton() {
      await this.getElement(this.disarmButton);
      await this.click(this.disarmButton);
      await this.sleep(7500);
      //await this.getElement(this.armAwayButton);
    }
    // Built this to return the panel status to me outside 
    // of a test on my test page. Steven Cooper 1/6/2021
    async getPanelStatus() {
      var currentStatus = await this.getText(this.panelStatus);
      return currentStatus;
    }
  
  /**
   * Tests whether the home page's navigation menu is expanded. 
   */
  async NavMenuDisplayed() {
    await this.driver.wait(until.elementLocated(this.headerLogo))
    let menuDisplayed: boolean = await this.driver.findElement(By.className("menu")).isDisplayed();
    return menuDisplayed;
  }

  /**
   * Navigates from the home page to the Account: Users page, using the UI. 
   */
  async goToUsersPage() {
    // If navigation menu is not present, click the list icon to expand it.
    if(!this.NavMenuDisplayed()) {
      await this.click(this.menuIcon);
    }
    // Click the navigation menu's "Users" button.
    // Get a list of the elements in the navigation menu. 
    let list = await this.driver.findElements(By.css("a.menu_link._8"));
    // Wait for headerLogo to be visible to ensure Users page has loaded. 
    await this.driver.wait(until.elementLocated(this.headerLogo));
  }

  /**
   * Logs in and navigates to the user's page.
   * Uses the URL for the account page rather than the UI.
   */
  async initUserPage() {
    await this.navigate();
    await this.login();
    // wait for headerLogo to be located and visible.
    await this.driver.wait(until.elementLocated(this.headerLogo));
    let element = await this.driver.findElement(this.headerLogo);
    await this.driver.wait(until.elementIsVisible(element));
    // Go to account page
    await this.driver.get(this.accountURL);
    // Wait until header logo on User's page is enabled.
    await this.driver.wait(
      until.elementIsEnabled(await this.getElement(this.headerLogo))
    );
  }

  /**
   * Returns the account's current number of users.
   * This number includes the primary account user, which cannot be deleted.
   */
  async getNumUsers() {
    await this.driver.wait(
      until.elementIsEnabled(await this.getElement(this.headerLogo))
    );
    let list = await this.driver.findElements(By.css("div.row.contact"));
    return list.length;
  }

  /**
   * Instructs the browser to wait for the site's header logo to load.
   */
  async waitToLoad(elementBy: By) {
    await this.driver.wait(
      until.elementIsEnabled(await this.getElement(elementBy))
    );
  }

  async signout() {
    // Navigate to logout page
      await this.navigate();
      
      await this.waitToLoad(this.headerLogo)
      //Wait for Logout button to be enabled
      await this.getElement(this.logout);
      //Click logout button
      await this.click(this.logout);
  }

  /**
   * This function does most of the work for deleting a user 
   * the account users list. After calling this function, the browser
   * will navigate to the confirmation page for deleting that user.
   * This function does NOT, by itself, delete a user.
   * 
   * @param userIndex - The array index of the user to be deleted 
   */
  async startDeleteUser(userIndex: number) {
    // Get the index of the last user in the list.
    // Convert the index into a string
    let indexString: string = userIndex.toString();
    // Using the converted index number, create a string that will be used 
    // to form an xpath to the last user's delete icon.
    let xpath_userDeleteIcon: string = `//input[@name = "form[delete_contact][${indexString}]"]`;
    // Wait for last user's delete icon to be enabled.
    await this.waitToLoad(By.xpath(xpath_userDeleteIcon))
    // Click the last user's delete icon. 
    await this.click(By.xpath(xpath_userDeleteIcon));
    // The browser will navigate to a confirmation page.
    // Wait for the confirmation page's "Delete" button to be enabled.
    await this.waitToLoad(this.confirmDelete)
    await this.driver.sleep(1000)
  }
  
  
}
