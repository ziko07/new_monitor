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


test("Commercial Rapidfire Lead Mobile Test", async ({ browser }) => {

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

  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://smartfinancial.com/get-fast-quote-commercial.html?aid=60&cid=48&sid=checkly_test')
  await business_name(page)
  await legal_entity(page)
  await address_step(page)
  await business_description(page)
  await years_in_business(page)
  await business_owners(page)
  await fulltime_employees(page) 
  await parttime_employees(page)  
  await revenue(page)
  await payroll(page)
  await coverage_type(page)
  await name_step(page)
  await email_step(page)
  await phone_step(page)
  await final_result(page)
})



test('Commercial Rapidfire Lead Desktop Test ', async ({ page }) => {
  // Change checklyhq.com to your site's URL,
  // or, even better, define a ENVIRONMENT_URL environment variable
  // to reuse it across your browser checks
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://smartfinancial.com/get-fast-quote-commercial.html?aid=60&cid=48&sid=checkly_test')
  await business_name(page)
  await legal_entity(page)
  await address_step(page)
  await business_description(page)
  await years_in_business(page)
  await business_owners(page)
  await fulltime_employees(page) 
  await parttime_employees(page)  
  await revenue(page)
  await payroll(page)
  await coverage_type(page)
  await name_step(page)
  await email_step(page)
  await phone_step(page)
  await final_result(page)
})


async function business_name(page) {
  const businessDiv = page.locator('.step.carousel-item.business-name.active');
  await expect(businessDiv).toBeVisible();
  await page.fill('input[name="business_name"]', 'PlayWright_Test');
  const continueButton = await businessDiv.locator('a:has-text("Continue")');
  await continueButton.click()
}

async function legal_entity(page) {

  const legal_entity= await selectRandomRadioButton(page, '.step.carousel-item.legal-entity')
  console.log(` Selected Legal Entity ${legal_entity}`)
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

async function business_description(page) {
  // Description of Your Business 
  const business_desc_Div = page.locator('.step.carousel-item.business-desc.active');
  await expect(business_desc_Div).toBeVisible();
  await page.fill('input[name="business_description"]', 'PlayWright Testing for Forms');
  const btn_business_desc = await business_desc_Div.locator('.btn.btn-custom.btn-block:has-text("Continue")');
  await expect(btn_business_desc).toBeVisible();
  await btn_business_desc.click();
  
}

async function years_in_business(page) {
  const business_years = await selectRandomRadioButton(page, '.step.carousel-item.business-year')
  console.log(`business years ${business_years}`)
}

async function business_owners(page) {

  const business_owners = await selectRandomRadioButton(page, '.step.carousel-item.partners')
  console.log(`business owners ${business_owners}`)
  
}

async function fulltime_employees(page) {
  const employees = await  selectRandomRadioButton(page,'.step.carousel-item.employees.active');
  console.log(`Fulltime Employees ${employees}`)
}

async function parttime_employees(page) {
  const part_employees = await  selectRandomRadioButton(page,'.step.carousel-item.part-employees.active');
  console.log(`Parttime Employees ${part_employees}`)
}

async function revenue(page) {

  const revenue = await  selectRandomRadioButton(page,'.step.carousel-item.annual-revenue.active');
  console.log(`Annual Revenue ${revenue}`)
    
}

async function payroll(page) {

  const annual_payroll = await  selectRandomRadioButton(page,'.step.carousel-item.annual-payroll.active');
  console.log(`Annual payroll ${annual_payroll}`)
    
}

async function coverage_type(page) {

  const coverage_type_div = page.locator('.step.carousel-item.coverage-type.active')
  await expect(coverage_type_div).toBeVisible()
  await page.click("label[for='coverage_1']")
  await page.click("label[for='coverage_6']")
  const btn_coverage = await coverage_type_div.locator('a.btn.btn-custom.btn-block:has-text("Continue")');
  await expect(btn_coverage).toBeVisible();
  await btn_coverage.click();

  
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
