/* 
Author: Helen Cunningham
Written: 01/02/21

Tests users' ability to successfully delete a sub-user. 
Handles cases:
    1. User deletes one sub-user 
    2. User starts to delete a sub-user from the account, and cancels the process.

This test group uses SmartLinkPage.ts, which is a polymorphic class inheriting functionality from BasePage.ts.
*/

import {SmartLinkPage} from "./PageObjects/SmartLinkPage";

describe("User deletion works", () => {
    const page = new SmartLinkPage({ browser: "chrome" });
    afterAll(async () => {
        await page.driver.quit();
    });
    test("User can delete one sub-user account", async () => {
        /*
        This test verifies that a user can successfully delete a sub-user on their account.
        This particular test deletes the last sub-user listed in the account's user list.
        Steps:
            1. Log in to SmartLink account
            2. Navigate to the account's Users Page
            3. Delete the last user in the account's list of users:
                a. Get the index of the last user in the account
                b. Press that user's trash can icon
                c. Site will navigate to a confirmation page. Confirm deletion. 
            4. Test that there is now one fewer user in the account's list of users.
        */

        // Log in, and navigate to the User's page from the home page.
        await page.initUserPage();
        // Determine how many users are in the account's list of users.
        let startNumUsers = await page.getNumUsers();
        // Get the index of the last user in the list.
        let lastContactIndex = startNumUsers - 1;
        await page.startDeleteUser(lastContactIndex);
        // Press the confirmation page's "Delete" button to delete the sub-user.
        await page.click(page.confirmDelete)
        // This action takes some time
        await page.driver.sleep(5000)
        // Get the new number of users in the users list.
        let endNumUsers = await page.getNumUsers()
        // The new number of users should be one less than the number of users gotten at the 
        // beginning of the test.
        expect(endNumUsers).toBe(startNumUsers - 1)
    });

    
    test("User can cancel the deletion of one sub-user account", async () => {
        /*
        This test verifies that, if a user on an account starts to delete a sub-user on their account,
        but then presses "Cancel" on the deletion confirmation page, the sub-user will
        not be deleted.
        Steps:
            1. Log in to SmartLink account
            2. Navigate to the account's Users Page
            3. Delete the last user in the account's list of users:
                a. Get the index of the last user in the account
                b. Press that user's trash can icon
                c. Site will navigate to a confirmation page.
                d. Press cancel
            4. Test that the number of account sub-users has not changed.
        */

        // Log in, and navigate to the User's page from the home page.
        await page.initUserPage();
        // Determine how many users are in the account's list of users.
        let startNumUsers = await page.getNumUsers();
        // Get the index of the last user in the list.
        let lastContactIndex = startNumUsers - 1;
        await page.startDeleteUser(lastContactIndex);
        // The browser will return the to the users page. Wait for its header to load before continuing.
        await page.waitToLoad(page.headerLogo)
        // Click cancel button
        await page.click(page.cancelDelete)
        // Wait for action to be completed.
        await page.driver.sleep(5000)
        // Get the new number of users in the users list.
        let endNumUsers = await page.getNumUsers()
        // The number of users at the end of the test should be the same as the number of users
        // at the beginning of the test.
        expect(endNumUsers).toBe(startNumUsers)
    });
});