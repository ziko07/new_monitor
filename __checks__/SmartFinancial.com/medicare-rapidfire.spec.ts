const { devices, expect, test } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });

// Configure the Playwright Test timeout to 210 seconds,
// ensuring that longer tests conclude before Checkly's browser check timeout of 240 seconds.
// The default Playwright Test timeout is set at 30 seconds.
// For additional information on timeouts, visit: https://checklyhq.com/docs/browser-checks/timeouts/
test.setTimeout(210000)

// Set the action timeout to 10 seconds to quickly identify failing actions.
// By default Playwright Test has no timeout for actions (e.g. clicking an element).
test.use({ actionTimeout: 10000 })



test("Medicare Rapidfire Mobile Test", async ({ browser }) => {

  const deviceNames = ['iPhone 11 Pro', 'iPhone 12', 'Galaxy S8', 'iPhone SE', 'Pixel 5'];
  const randomIndex = getRandomIndex(deviceNames.length);
  const selectedDevice = deviceNames[randomIndex];

  const dev = devices[selectedDevice];
  // iPhone 11 Pro, iPhone12, Galaxy S8, iPhone SE, Pixel 5
  // Initialize a new page
  // with the iPhone user agent, dimensions and pixel density
  const page = await browser.newPage({
    ...dev,
  });
  
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://smartfinancial.com/get-fast-quote-medicare.html?aid=60&cid=48&sid=checkly_test')

  
  await step_no_dob(page);
  await step_set_dob(page);
  await step_gender(page);
  await step_name(page);
  await step_address(page);
  await step_email(page);
  await step_medicare_advantage(page);
  await step_phone(page);
  await final_result(page)
  
})




test('Medicare Rapidfire Desktop Test', async ({ page }) => {

  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://smartfinancial.com/get-fast-quote-medicare.html?aid=60&cid=48&sid=checkly_test')

  await step_no_dob(page);
  await step_set_dob(page);
  await step_gender(page);
  await step_name(page);
  await step_address(page);
  await step_email(page);
  await step_medicare_advantage(page);
  await step_phone(page);
  await final_result(page)
  
});

async function step_no_dob(page) {

  //
  const ratherNotSayLink = page.getByRole('link', { name: "I'd rather not say" });
  await expect(ratherNotSayLink).toBeVisible();
  await ratherNotSayLink.click();

  // Wait for the "gender" div to become active
  const genderStepDiv = page.locator('.step.carousel-item.gender');
  await genderStepDiv.waitFor({ state: 'visible', timeout: 10000 });
  await expect(genderStepDiv).toBeVisible();

  // Go back using the browser's back functionality
  await page.goBack();
  
}

async function step_set_dob(page) {
  
  // Target the DOB step container
  const dob_div = page.locator('div[data-step="dob"]');
  await expect(dob_div).toBeVisible();
  
  // Fill in the DOB fields
  const dobMonth = page.locator('input[name="driver-dob-month"]');
  await expect(dobMonth).toHaveCount(1);
  await dobMonth.click(); 
  await dobMonth.fill('12', { delay: 100 });
  
  const dob_day = page.locator('input[name="driver-dob-day"]');
  await dob_day.click();
  await dob_day.fill('15', { delay: 100 });
  
  const dob_year = page.locator('input[name="driver-dob-year"]');
  await dob_year.click(); 
  await dob_year.fill('1965', { delay: 100 });
  
  // Click the "Continue" button
  const continueButton = dob_div.locator('a.btn-dob-continue');
  await continueButton.click();
  
  // Wait for the error message and ensure it's visible
  const errorMessage = dob_div.locator('.error-msg:has-text("Looks like you are currently not eligible for Medicare.")');
  await expect(errorMessage).toBeVisible();

  // Interact with the "Yes" button and handle navigation
  const yesButton = dob_div.locator('a:has-text("Yes")');
  await expect(yesButton).toBeVisible();
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }), // Wait for navigation
    yesButton.click(),  // Click the "Yes" button
  ]);

  // Check if the new page loaded correctly
  await expect(page).toHaveURL(/get-fast-quote-health\.html/); 
  await expect(page.locator('.carousel-item.dob.active')).toBeVisible(); // Ensure an element is visible on the new page
  
  // Go back to the previous page
  await page.goBack(); 
  
  // Refill the DOB fields with a new date and click continue
  await dobMonth.click(); 
  await dobMonth.fill('12', { delay: 100 });
  await dob_day.click(); 
  await dob_day.fill('15', { delay: 100 });
  await dob_year.click(); 
  await dob_year.fill('1955', { delay: 100 });
  
  await continueButton.click();
}


async function step_gender(page) {

  await selectRandomRadioButton(page, '.carousel-item.gender');
  
}

async function step_name(page) {

  // name 
  const name_div = page.locator('.step.carousel-item.name.active');
  await expect(name_div).toBeVisible();
  const firstName = await page.locator('input[placeholder="First Name"]')
  const lastName = await page.locator('input[placeholder="Last Name"]')
  await expect(firstName).toBeVisible()
  await expect(lastName).toBeVisible()
  await firstName.fill("Jane", { delay: 100 });
  await lastName.fill("Doe", { delay: 100 });
  const btn_name = await name_div.locator('a.btn.btn-custom.btn-block');
  await expect(btn_name).toBeVisible()
  await btn_name.click();

}

async function step_address(page) {

  // address
  // Ensure the address section is visible
  const address_div = page.locator('.step.carousel-item.address.active');
  await expect(address_div).toBeVisible();

  // Fill the address input field
  const address = page.locator('#address-search');
  await address.click();  // Ensure the field is focused
  
  // Type the address with a slight delay between characters to simulate real typing
  await address.type("1600 Pennsylvania Avenue Northwest", { delay: 100 });
  
  // Wait for the suggestions dropdown to appear
  const suggestionList = page.locator(".pac-container");
  try {
    // Ensure the first suggestion is visible and click it
    const firstSuggestion = suggestionList.locator(".pac-item").first();
    await firstSuggestion.waitFor({ state: 'visible', timeout: 10000 });  // Wait for up to 10 seconds for suggestions to appear
    await firstSuggestion.click();  // Click the first suggestion
  } catch (error) {
    console.error("No address suggestions appeared. Retrying...");
    // Optionally retry the address entry here
  }

  await page.waitForTimeout(500);  // Slight wait after selecting the suggestion
  
  // Ensure the "Continue" button is visible within the address section and click it
  const btn_address = address_div.locator('a.btn.btn-custom.btn-block');
  await expect(btn_address).toBeVisible();
  await btn_address.click();

  

}

async function step_email(page) {

   // // email 
   const email_div = page.locator('.step.carousel-item.email.active');
   await expect(email_div).toBeVisible();
   const emailInput = await page.locator('input[placeholder="Email"]')
   await expect(emailInput).toBeVisible()
   const emailSubmit = await email_div.locator("a.btn.btn-custom.btn-block")
   const emailErrorDiv = await page.locator(".step.carousel-item.email.active .error-msg")
   await emailSubmit.click()
   await expect(emailErrorDiv).toContainText("Email is required")
   await emailInput.type("yogesh.checklytest@smartfinancial.com")
   await emailSubmit.click()


  
 
}

async function step_medicare_advantage(page) {
   
  const medicare_advantage_div = page.locator('div[data-step="compare-rates"]');
  await expect(medicare_advantage_div).toBeVisible();
  await selectRandomRadioButton(page, 'div[data-step="compare-rates"]');
  const btncontinue = await medicare_advantage_div.locator("a.btn.btn-custom.btn-block")
  await btncontinue.click()

  
}

async function step_phone(page) {
  // phone
  const phone_div = page.locator('.step.carousel-item.phone.active');
  await expect(phone_div).toBeVisible();
  const phoneInput = await page.locator('input[placeholder="(xxx) xxx-xxxx"]')
  await expect(phoneInput).toBeVisible()
  const viewRates = await page.locator("#submit-lead")
  // Click and type the phone number
  await phoneInput.click();
  await phoneInput.type("(877) 323-7751", { delay: 100 });
  await viewRates.click()
  
}

async function final_result(page) {

  await page.waitForSelector('#result-listing-container', { state: 'visible', timeout: 20000 });
  const resultListingContainer = await page.locator('#result-listing-container');
  await expect(resultListingContainer).toBeVisible();
  await page.waitForSelector('.result-quote-item', { state: 'visible', timeout: 20000 });
  const resultItems = await page.locator('.result-quote-item');
  const resultCount = await resultItems.count();
  expect(resultCount).toBeGreaterThan(0);

}

 
function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}


async function selectRandomRadioButton(page, locator) {
  await expect(page.locator(`${locator}`)).toBeVisible();
  let radioButtons = await page.locator(`${locator} input[type="radio"]`);
  let options = await radioButtons.all();
  if (options.length === 0) {
    throw new Error(`No radio buttons found at ${locator}`);
  }
  let randomIndex = getRandomIndex(options.length);
  let radioButtonId = await radioButtons.nth(randomIndex).getAttribute('id');
  let labelSelector = `label[for='${radioButtonId}']`;
  await page.click(labelSelector);
  return radioButtonId;
}

/**
 * Selects a random option from a dropdown menu on a page.
 * @param {object} page - The Playwright page object.
 * @param {string} dropdownLocator - The CSS locator for the dropdown menu.
 * @returns {Promise<string>} - The selected value.
 */
async function selectRandomDropdownOption(page, dropdownLocator) {
  const dropdown = await page.locator(dropdownLocator);
  await expect(dropdown).toBeVisible();
  // Scroll into view if necessary
  await dropdown.scrollIntoViewIfNeeded();
  try {
      await dropdown.click();
  } catch (e) {
      // If regular click fails, try forcing the click
      console.warn(`Dropdown click failed, attempting force click...`);
      await dropdown.click({ force: true });
  }

  await page.waitForSelector(`${dropdownLocator} ng-dropdown-panel .ng-option-label`);
  const options = await dropdown.locator('ng-dropdown-panel .ng-option-label').allTextContents();

  if (options.length === 0) {
    throw new Error(`No options found for dropdown: ${dropdownLocator}`);
    console.log(`No Element in DropDown ${dropdownLocator}`)
  }

  const randomIndex = getRandomIndex(options.length);
  await dropdown.locator('ng-dropdown-panel .ng-option-label').nth(randomIndex).click();

  const selectedValue = await dropdown.locator('.ng-value-label').textContent();
  console.log(`Selected Value: ${selectedValue.trim()}`);
  expect(selectedValue.trim()).toBe(options[randomIndex].trim());
  
  return selectedValue.trim();
}
