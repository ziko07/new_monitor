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

let secondCarSelected;
let marriedSelected;

test("Auto Rapidfire Lead Mobile Test", async ({ browser }) => {

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


  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://smartfinancial.com/get-fast-quote.html?aid=60&cid=48&sid=checkly_test')
  await year_step(page, 'div[data-step="car-1-year"] .option-input-group'); // 
  await make_step(page, 'div[data-step="car-1-make"]', '.step-car-makes .option-input-group', '.step-car-makes .custom-select-input select')
  await model_step(page, 'div[data-step="car-1-model"] .option-input-group');
  await second_car_step(page);
  await currently_insured(page);
  await home_owner(page);
  await dob_step(page)
  await gender_step(page)
  await married_step(page)
  await household_vehicles(page);
  await driver_fault(page)
  await driver_name(page)
  await military_affiliation(page)
  await address_step(page)
  await email_step(page)
  await phone_step(page)

})



test('Auto Rapidfire Lead Desktop Test ', async ({ page }) => {
  // Change checklyhq.com to your site's URL,
  // or, even better, define a ENVIRONMENT_URL environment variable
  // to reuse it across your browser checks
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://smartfinancial.com/get-fast-quote.html?aid=60&cid=48&sid=checkly_test')
  await year_step(page, 'div[data-step="car-1-year"] .option-input-group'); // 
  await make_step(page, 'div[data-step="car-1-make"]', '.step-car-makes .option-input-group', '.step-car-makes .custom-select-input select')
  await model_step(page, 'div[data-step="car-1-model"] .option-input-group');
  await second_car_step(page);
  await currently_insured(page);
  await home_owner(page);
  await dob_step(page)
  await gender_step(page)
  await married_step(page)
  await household_vehicles(page);
  await driver_fault(page)
  await driver_name(page)
  await military_affiliation(page)
  await address_step(page)
  await email_step(page)
  await phone_step(page)

})

async function year_step(page, locator) {

  const year = await selectRandomRadioButton(page, locator);
  console.log(`Randomly selected car year: ${year}`);

}

async function make_step(page, locator1, makesLocator1, makesLocator2) {
  //motorcycle-make
  const make_div = page.locator(locator1);
  await expect(make_div).toBeVisible();
  const selectedRadioButtonId = await selectRandomRadioButton(page, makesLocator1);
  console.log(`Randomly selected make: ${selectedRadioButtonId}`);
  // const methods = ['radio', 'select'];
  // const randomIndex = getRandomIndex(methods.length);
  // const selectedMethod = methods[randomIndex];

  // if (selectedMethod === 'radio'){
  //     const makesLocator = '.step-car-makes .option-input-group';

  //     const selectedRadioButtonId = await selectRandomRadioButton(page, makesLocator1);
  //     console.log(`selected from option ${selectedRadioButtonId}`)
  //     //const make = await selectRandomRadioButton(page, 'div[data-step="motorcycle-make"]')

  // }else{
  //     const make = await selectRandom(page, makesLocator2 )
  //     console.log(`selected from Dropdown ${make}`)
  // }
}

async function model_step(page, locator1) {
  // .step-car-models . 
  const model = await selectRandomRadioButton(page, locator1)
  console.log(`Randomly selected car model: ${model}`);

}

async function second_car_step(page) {

  //second-car
  const second_car = await selectRandomRadioButton(page, 'div[data-step="second-car"]')

  secondCarSelected = second_car;

  if (second_car === 'second_vehicle_yes') {
    console.log(`Second Car Choise Selected`)
    const year2 = await year_step(page, 'div[data-step="car-2-year"] .option-input-group'); // 
    console.log(`Randomly selected car2 year: ${year2}`);

    const make2 = await make_step(page, 'div[data-step="car-2-make"]', 'div[data-step="car-2-make"].step-car-makes .option-input-group', 'div[data-step="car-2-make"].step-car-makes .custom-select-input select')
    console.log(`Randomly selected car2 make: ${make2}`);
    const model2 = await model_step(page, 'div[data-step="car-2-model"] .option-input-group');
    console.log(`Randomly selected car2 model: ${model2}`);


  }
}

async function currently_insured(page) {
  const insured = await selectRandomRadioButton(page, 'div[data-step="currently-insured"]')
  console.log(insured)
  if (insured === 'insured_yes') {
    console.log("insured yes selected ")
    const insco_company = await selectRandomRadioButton(page, 'div[data-step="insco-company"]')
    console.log(`insco_company: ${insco_company}`);
    const coverage_length = await selectRandomRadioButton(page, 'div[data-step="coverage-length"]')
    console.log(`coverage_length: ${coverage_length}`);
  }
}

async function home_owner(page) {
  const home_owner = await selectRandomRadioButton(page, 'div[data-step="homeowner"]')
  if (home_owner === 'homeowner_yes') {
    await include_home_insurance(page)

  }

}

async function include_home_insurance(page) {
  //
  const include_bundle = await selectRandomRadioButton(page, 'div[data-step="include-bundle"]')

}


async function dob_step(page) {

  // Target the DOB step container
  const dob_div = page.locator('div[data-step="driver-1-dob"]');
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
  console.log(`DOB selected`);
}

async function gender_step(page) {
  const gender = await selectRandomRadioButton(page, 'div[data-step="driver-1-gender"]');
  console.log(`Gender  selected ${gender}`);

}


async function married_step(page) {
  const married = await selectRandomRadioButton(page, 'div[data-step="driver-1-married"]');
  console.log(`married  selected ${married}`);
  marriedSelected = married
}

async function household_vehicles(page) {




  if (secondCarSelected === 'second_vehicle_no' && marriedSelected === 'driver_0_married_yes') {
    // Both conditions are true
    console.log('The driver does not have a second vehicle and is married.');
    const household_vehicles_div = await page.locator('div[data-step="car-coverage"]')
    const household_vehicles = await selectRandomRadioButton(page, 'div[data-step="car-coverage"]');
    const btn = await household_vehicles_div.locator("a.btn.btn-custom.btn-block")
    await btn.click()

  }

  if (secondCarSelected === 'second_vehicle_no' && marriedSelected === 'driver_0_married_no') {
    // Both conditions are true
    console.log('The driver does not have a second vehicle and is not married.');
    const household_vehicles_div = await page.locator('div[data-step="car-coverage"]')
    const household_vehicles = await selectRandomRadioButton(page, 'div[data-step="car-coverage"]');
    const btn = await household_vehicles_div.locator("a.btn.btn-custom.btn-block")
    await btn.click()
  }




}

async function driver_fault(page) {

  //
  const driver_fault = await selectRandomRadioButton(page, 'div[data-step="driver-1-fault"]');
  console.log(`driver_fault  selected ${driver_fault}`);

  const dui = await selectRandomRadioButton(page, 'div[data-step="driver-1-dui"]');
  console.log(`driver_dui selected ${dui}`);

}

async function driver_name(page) {

  // name 
  const name_div = page.locator('div[data-step="driver-1-name"]');
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
  console.log(`driver name entered`);

}

async function military_affiliation(page) {
  const military_affiliation = await selectRandomRadioButton(page, 'div[data-step="military_affiliation"]');
  console.log(`military_affiliation  ${military_affiliation}`);
}

async function address_step(page) {

  let attempt = 1;

  while (attempt < 4) {
    try {
      // Locate the address section
      const address_div = page.locator('div[data-step="address"]');
      await expect(address_div).toBeVisible();

      // Fill the address input field
      const address = page.locator('#address-search');
      await address.click();  // Ensure the field is focused
      await address.fill('')
      await address.click();
      // Type the address with a slight delay between characters to simulate real typing
      await address.type("1600 Pennsylvania Avenue Northwest", { delay: 100 });

      // Wait for the suggestions dropdown to appear
      const suggestionList = page.locator(".pac-container");

      // Ensure the first suggestion is visible and click it
      const firstSuggestion = suggestionList.locator(".pac-item").first();
      await firstSuggestion.waitFor({ state: 'visible', timeout: 10000 });  // Wait for up to 10 seconds for suggestions to appear
      await firstSuggestion.click();  // Click the first suggestion

      await page.waitForTimeout(500);  // Slight wait after selecting the suggestion
      // Ensure the "Continue" button is visible within the address section and click it
      const btn_address = address_div.locator('a.btn.btn-custom.btn-block');
      await expect(btn_address).toBeVisible();
      await btn_address.click();
      console.log(`Address Selected in ${attempt} attempts `)
      break;

    } catch (error) {
      console.error(`Address Selection Attempt failed due to: ${error.message}`);
      attempt += 1;

      if (attempt < 4) {
        console.log(`Retrying...Address Selection  Attempts left: ${3 - attempt}`);
      } else {
        console.error('All attempts to select Address Autocomplete failed.');
        throw new Error('Failed to select Address Autocomplete after 3 attempts.');
      }
    }
  }





}

async function email_step(page) {

  // // email 
  const email_div = page.locator('div[data-step="email"]');
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
  const phone_div = page.locator('div[data-step="phone"]');
  await expect(phone_div).toBeVisible();

  // Locate the phone input field and 'View Rates' button
  const phoneInput = page.locator('input[name="phone"]');
  const viewRates = page.locator("#submit-lead");

  // Ensure the phone input field is visible
  await expect(phoneInput).toBeVisible();
  const phoneErrorDiv = await phone_div.locator(".error-msg")
  await viewRates.click();
  await expect(phoneErrorDiv).toContainText("Phone number is required")
  await phoneInput.click()
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



async function selectRandom(page, locator) {
  const makeDropdown = page.locator(`${locator}`);
  await expect(makeDropdown).toBeVisible();
  // Get all available options
  const options = await makeDropdown.locator('option').all(); // Get all the option elements
  const optionValues = await Promise.all(options.map(option => option.getAttribute('value'))); // Get the 'value' of each option
  // Filter out any invalid options like empty, null, or undefined values
  const validOptions = optionValues.filter(
    value => value !== null && value !== '' && value !== 'undefined' && value !== 'YAM'
  );
  if (validOptions.length === 0) {
    throw new Error('No valid options available in the dropdown car-make.');
  }
  // Select a random option from the valid options
  const randomIndex = getRandomIndex(validOptions.length);
  const randomOption = validOptions[randomIndex];

  // Select the random option
  await makeDropdown.selectOption(randomOption);

  // Log the selected option
  const selectedOption = await makeDropdown.inputValue();
  console.log('Randomly selected car make:', selectedOption);
  return selectedOption.trim();

}