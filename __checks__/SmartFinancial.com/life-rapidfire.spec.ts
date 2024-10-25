/**
  * To learn more about Playwright Test visit:
  * https://checklyhq.com/docs/browser-checks/playwright-test/
  * https://playwright.dev/docs/writing-tests
  */

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


test("Life Rapidfire Lead Mobile Test", async ({ browser }) => {

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

  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://smartfinancial.com/get-fast-quote-life.html?aid=60&cid=48&sid=checkly_test')
  await dob_step(page);
  await gender_step(page);
  await married_step(page);
  await height_step(page);
  await weight_step(page);
  await tobacco_step(page);
  await health_conditions(page);
  await intersted_coverage(page);
  await coverage_amount(page);
  await name_step(page);
  await address_step(page);
  await email_step(page);
  await phone_step(page);
  await final_result(page);
})



test('Life Rapidfire Lead Desktop Test ', async ({ page }) => {
  // Change checklyhq.com to your site's URL,
  // or, even better, define a ENVIRONMENT_URL environment variable
  // to reuse it across your browser checks
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://smartfinancial.com/get-fast-quote-life.html?aid=60&cid=48&sid=checkly_test')
  await dob_step(page);
  await gender_step(page);
  await married_step(page);
  await height_step(page);
  await weight_step(page);
  await tobacco_step(page);
  await health_conditions(page);
  await intersted_coverage(page);
  await coverage_amount(page);
  await name_step(page);
  await address_step(page);
  await email_step(page);
  await phone_step(page);
  await final_result(page);
})





 
 
 

async function dob_step(page) {
   // Target the DOB step container
   const dob_div = page.locator('div[data-step="dob"]');
   await expect(dob_div).toBeVisible();
   
   // Fill in the DOB fields
   const dobMonth = page.locator('input[placeholder="MM"]');
   await expect(dobMonth).toHaveCount(1);
   await dobMonth.click(); 
   await dobMonth.fill('12', { delay: 100 });
   
   const dob_day = page.locator('input[placeholder="DD"]');
   await dob_day.click();
   await dob_day.fill('15', { delay: 100 });
   
   const dob_year = page.locator('input[placeholder="YYYY"]');
   await dob_year.click(); 
   await dob_year.fill('2015', { delay: 100 });
   
   // Click the "Continue" button
   const continueButton = dob_div.locator('a.btn.btn-custom.btn-block');
   await continueButton.click();
   
   // Wait for the error message and ensure it's visible
   const errorMessage = dob_div.locator('.error-msg:has-text("Driver must be at least 18 years old")');
   await expect(errorMessage).toBeVisible();
 

   // Refill the DOB fields with a new date and click continue
   await dobMonth.click(); 
   await dobMonth.fill('12', { delay: 100 });
   await dob_day.click(); 
   await dob_day.fill('15', { delay: 100 });
   await dob_year.click(); 
   await dob_year.fill('1985', { delay: 100 });
   
   await continueButton.click();
}

async function gender_step(page) {
  await selectRandomRadioButton(page, '.step.carousel-item.gender.active');
  
}

async function married_step(page) {
  await selectRandomRadioButton(page, '.step.carousel-item.married.active');
}

async function height_step(page) {
  const height_div = await page.locator('.step.carousel-item.height.active');
  await expect(height_div).toBeVisible();
  await page.waitForSelector('input[name="height_feet"]');
  await page.type('input[name="height_feet"]', '5', { delay: 100 });
  await page.waitForSelector('input[name="height_inches"]');
  await page.type('input[name="height_inches"]', '11', { delay: 100 });
   
  // Wait for the Continue button to appear
  const height_btn = await height_div.locator('a.btn.btn-custom.btn-block');
  await expect(height_btn).toBeVisible();
  await expect(height_btn).toBeEnabled();
  await height_btn.click();
  
}
 
async function weight_step(page) {
  // weight
  const weight_div = await page.locator('.step.carousel-item.weight.active');
  await expect(weight_div).toBeVisible();
  const weight = await page.waitForSelector('input[name="weight_lbs"]');
  await weight.type('150', { delay: 100 });
  
  // Wait for the Continue button to appear
  const weight_btn = await weight_div.locator('a.btn.btn-custom.btn-block');
  await expect(weight_btn).toBeVisible();
  await expect(weight_btn).toBeEnabled();

  await weight_btn.click();
   
}

async function tobacco_step(page) {
  await selectRandomRadioButton(page, '.step.carousel-item.tobacco.active');
}

async function health_conditions(page) {
  const health_condition =  await selectRandomRadioButton(page, '.step.carousel-item.health-condition.active');
  if ( health_condition === 'health_condition_yes'){

    const health_conditions_div = await page.locator('.step.carousel-item.apply-health-condition.active')

    const label_blood_pressure = await page.locator('label[for="health_conditions_9"]');
    await label_blood_pressure.click();

    const label_cholestrol = await page.locator('label[for="health_conditions_5"]');
    await label_cholestrol.click();

    const btn_health_conditions = await health_conditions_div.locator('a.btn.btn-custom.btn-block');
    await btn_health_conditions.click();
  }
}

async function intersted_coverage(page) {
  
  await selectRandomRadioButton(page, '.step.carousel-item.interested-coverage.active');
  
}

async function coverage_amount(page){
   
  await selectRandomRadioButton(page, '.step.carousel-item.coverage-amount.active');

}



async function name_step(page) {

    // name 
    const name_div = page.locator('.step.carousel-item.name.active');
    await expect(name_div).toBeVisible();
    const firstName = await page.locator('input[placeholder="First Name"]')
    const lastName = await page.locator('input[placeholder="Last Name"]')
    await expect(firstName).toBeVisible()
    await expect(lastName).toBeVisible()
    await firstName.click();
    await firstName.fill("Jane")
    await lastName.click();
    await lastName.fill("Doe")
    const btn_name = await name_div.locator('a.btn.btn-custom.btn-block');
    await expect(btn_name).toBeVisible()
    await btn_name.click();
  
}


//address
async function address_step(page) {
  // Locate the address section
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

async function email_step(page) {

  // // email 
  const email_div = page.locator('.step.carousel-item.email.active');
  await expect(email_div).toBeVisible();
  const emailInput = await page.locator('input[placeholder="Email"]')
  await expect(emailInput).toBeVisible()
  const emailSubmit = await email_div.locator("a.btn.btn-custom.btn-block")
  const emailErrorDiv = await email_div.locator(".error-msg")
  await emailSubmit.click()
  await expect(emailErrorDiv).toContainText("Email is required")
  await emailInput.type("yogesh.checklytest@smartfinancial.com")
  await emailSubmit.click()
}


async function phone_step(page) {
  // Locate the phone input section
  const phone_div = page.locator('.step.carousel-item.phone.active');
  await expect(phone_div).toBeVisible();
  
  // Locate the phone input field and 'View Rates' button
  const phoneInput = page.locator('input[name="phone"]');
  const viewRates = page.locator("#submit-lead");

  // Ensure the phone input field is visible
  await expect(phoneInput).toBeVisible();

  // Click and type the phone number
  await phoneInput.click();
  await phoneInput.type("(877) 323-7751", { delay: 100 });

  // Click the 'View Rates' button
  await viewRates.click();
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


async function fillInsuranceForm(page) {
  const section_quotes_wrapper = page.locator('#section-quotes');
  await expect(section_quotes_wrapper).toBeVisible();
  
  const insuranceDropdown = section_quotes_wrapper.locator('select[name="type"]');
  await expect(insuranceDropdown).toBeVisible();
  await insuranceDropdown.click();
  await page.waitForTimeout(500);
  await insuranceDropdown.selectOption({ label: 'Home Insurance' });
  
  const zip = section_quotes_wrapper.locator('input[name="zip"]');
  await zip.fill('');
  await page.waitForTimeout(500);
  await zip.fill('90001', { delay: 100 });
  
  const mainButton = section_quotes_wrapper.locator('#main-button');
  await expect(mainButton).toBeVisible();
  await page.waitForTimeout(500);
  await mainButton.click();
  await page.waitForNavigation();
  await expect(page).toHaveURL(/get-fast-quote-home/);
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
