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
      // Account page URL
      accountURL: string = "https://smartlink.secure.direct/7.95/html/account_docs/account_lite_contacts.php";
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
      // Menu icon (expands navigation menu when clicked)
      menuIcon:By = By.css("div.icon.menuIcon");
      // Class of navigation button elements from drop-down list
      menuButtons:By = By.className("menu_row_box");
      // Button to navigate to account page
      userNavButton: By = By.xpath("/html/body/div[1]/div/div[1]/div[2]/div[4]/div[4]/div/div[3]/a");
      // User Page Elements:
      // Individual user element
      indivUser:By = By.className("contactTop");
      // Deletion Confirmation Page:
      // Confirmation "Delete" button
      confirmDelete:By = By.xpath('//span[text()="Delete"]');
      
      
    

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