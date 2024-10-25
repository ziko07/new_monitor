/**
 * To learn more about Playwright Test visit:
 * https://checklyhq.com/docs/browser-checks/playwright-test/
 * https://playwright.dev/docs/writing-tests
 */

const { devices, expect, test } = require("@playwright/test")

// run all tests in parallel
test.describe.configure({ mode: 'parallel' });

// Configure the Playwright Test timeout to 230 seconds,
// ensuring that longer tests conclude before Checkly's browser check timeout of 240 seconds.
// The default Playwright Test timeout is set at 30 seconds.
// For additional information on timeouts, visit: https://checklyhq.com/docs/browser-checks/timeouts/
test.setTimeout(230000)

// Set the action timeout to 10 seconds to quickly identify failing actions.
// By default Playwright Test has no timeout for actions (e.g. clicking an element).
test.use({ actionTimeout: 10000 })

test("mobile, single car, homeowner, insured", async ({ browser }) => {
  // Scenario 1 - 1 car, homeowner, insured
  const dev = devices['Galaxy S8']
  // Initialize a new page
  // with the iPhone user agent, dimensions and pixel density
  const page = await browser.newPage({
    ...dev,
  });
  const baseUrl = process.env.BASE_URL
  const response = await page.goto(`${baseUrl}/?aid=60&cid=48&sid=checkly_test`)

  // check 5 digit zip code is automatically populated
  await page.waitForTimeout(2000)
  const inputValue = await page.inputValue("#zipcode")
  const regex = /^\d{5}$/
  expect(inputValue).toMatch(regex)

  // click submit
  await page.click(".submit-btn")
  await page.waitForNavigation()

  // trusted form and jornaya lead ID
  const jornayaLeadID = await page.locator("#leadid_token")
  const trustedFormToken = await page.locator("#xxTrustedFormToken_0")
  expect(jornayaLeadID.inputValue()).not.toBe("")
  expect(trustedFormToken.inputValue()).not.toBe("")

  // make sure form loads with vehicle year question
  const vehYear = await page.locator("#car_0_year_2025")
  await expect(vehYear).toHaveCount(1)
  await page.click("label[for='car_0_year_2025']")
  const vehMake = await page.locator("#car_0_make_HON")
  await expect(vehMake).toHaveCount(1)
  await page.click("label[for='car_0_make_HON']")
  const vehModel = await page.locator("#car_0_model_2318")
  await expect(vehModel).toHaveCount(1)
  await page.click("label[for='car_0_model_2318']")

  // second vehicle - no
  const newVehicle = await page.locator("#second_vehicle_no")
  await expect(newVehicle).toHaveCount(1)
  await page.click("label[for='second_vehicle_no']")

  // insured yes
  const insured = await page.locator("#insured_yes")
  await expect(insured).toHaveCount(1)
  await page.click("label[for='insured_yes']")
  const currentCarrier = await page.locator("#current_carrier_2")
  await expect(currentCarrier).toHaveCount(1)
  await page.click("label[for='current_carrier_2']")
  const continuousInsurance = await page.locator("#coverage_2")
  await expect(continuousInsurance).toHaveCount(1)
  await page.click("label[for='coverage_2']")

  // homeowner - yes
  const homeOwner = await page.locator("#homeowner_yes")
  await expect(homeOwner).toHaveCount(1)
  await page.click("label[for='homeowner_yes']")
  const homeBundle = await page.locator("#include_bundle_yes")
  await expect(homeBundle).toHaveCount(1)
  await page.click("label[for='include_bundle_yes']")

  // DOB
  const dobMonth = await page.locator(".dob-0-month")
  await expect(dobMonth).toHaveCount(1)
  const dobDay = await page.locator(".dob-0-day")
  await expect(dobDay).toHaveCount(1)
  const dobYear = await page.locator(".dob-0-year")
  await expect(dobYear).toHaveCount(1)
  const dobSubmit = await page.locator(".btn-custom").first()
  const dobErrorDiv = await page.locator(".error-msg").first()
  await expect(dobSubmit).toBeVisible()
  await dobSubmit.click()
  await expect(dobErrorDiv).toContainText("Please enter a valid date")
  // Type invalid input
  // await dobMonth.type("13")
  // await dobDay.type("13")
  // await dobYear.type("1981")
  // await dobSubmit.click()
  // await expect(dobErrorDiv).toContainText("Please enter a valid date")
  await dobMonth.click()
  await dobMonth.fill("01")
  await dobDay.click()
  await dobDay.fill("11")
  await dobYear.click()
  await dobYear.fill("1981")
  await dobSubmit.click()
  await expect(dobErrorDiv).toBeEmpty()

  // gender
  const gender = await page.locator("#driver_0_gender_male")
  await expect(gender).toHaveCount(1)
  await page.click("label[for='driver_0_gender_male']")

  // marital
  const marital = await page.locator("#driver_0_married_yes")
  await expect(marital).toHaveCount(1)
  await page.click("label[for='driver_0_married_yes']")

  // num vehicles
  const numVehicles = await page.locator("#car_coverage_1")
  await expect(numVehicles).toHaveCount(1)
  await expect(numVehicles).toBeChecked()

  const numVehSubmit = await page.locator(".btn-custom").nth(1)
  await numVehSubmit.click()

  // accidents
  const accidents = await page.locator("#driver_0_fault_no")
  await expect(accidents).toHaveCount(1)
  await page.click("label[for='driver_0_fault_no']")

  // DUI
  const dui = await page.locator("#driver_0_dui_no")
  await expect(dui).toHaveCount(1)
  await page.click("label[for='driver_0_dui_no']")

  // name
  const firstName = await page.locator('input[placeholder="First Name"]')
  const lastName = await page.locator('input[placeholder="Last Name"]')
  await expect(firstName).toBeVisible()
  await expect(lastName).toBeVisible()
  await firstName.fill("John")
  await page.waitForTimeout(500)
  await lastName.fill("Doe")
  const nameSubmit = await page.locator(".btn-custom").nth(2)
  await nameSubmit.click()

  // military affiliation
  const military = await page.locator("#military_no")
  await expect(military).toHaveCount(1)
  await page.click("label[for='military_no']")

  // address
  const addressSubmit = await page.locator(".btn-custom").nth(3)
  const addressErrorDiv = await page.locator(".error-msg").nth(4)
  const cityErrorDiv = await page.locator(".error-msg").nth(5)
  const zipErrorDiv = await page.locator(".error-msg").nth(7)
  await addressSubmit.click()
  await expect(addressErrorDiv).toContainText("Address is required")
  // await expect(cityErrorDiv).toContainText('City is required');
  // await expect(zipErrorDiv).toContainText('Zip code is required');
  const address = await page.locator('input[placeholder="Address"]')
  // Type a query to trigger auto-suggestions
  await address.type("1600 Amphitheatre Parkway")
  // Wait for suggestions to appear
  const suggestionList = page.locator(".pac-container") // Google Maps Autocomplete suggestions container
  await expect(suggestionList).toBeVisible()
  // Click on the first suggestion
  const firstSuggestion = suggestionList.locator(".pac-item").first()
  await firstSuggestion.click()
  await expect(address).toHaveValue(
    "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  )
  await addressSubmit.click()

  // email
  const emailInput = await page.locator('input[placeholder="Email"]')
  await expect(emailInput).toBeVisible()
  const emailSubmit = await page.locator(".btn-custom").nth(4)
  const emailErrorDiv = await page.locator(".error-msg").nth(8)
  await emailSubmit.click()
  await expect(emailErrorDiv).toContainText("Email is required")
  await emailInput.type("ypendharkar+checklytest@smartfinancial.com")
  await emailSubmit.click()

  // phone
  // const phoneInput = await page.locator('input[name="Phone"]');
  const phoneInput = await page.locator('input[placeholder="(xxx) xxx-xxxx"]')
  await expect(phoneInput).toBeVisible()
  const phoneSubmit = await page.locator("#submit-lead")
  const phoneErrorDiv = await page.locator(".error-msg").nth(9)
  await phoneSubmit.click()
  await expect(phoneErrorDiv).toContainText("Phone number is required")
  await phoneInput.type("8773237750")
  await page.screenshot({ path: "submit_page1.jpg" })
  await phoneSubmit.click()

  // thank you page
  // await page.waitForTimeout(7000)
  // await page.screenshot({ path: "thank_you_page.jpg" })
  // const buttons = page.locator(".btn-get-quote")
  // const buttonCount = await buttons.count()
  // expect(buttonCount).toBeGreaterThan(0)
  const listingContainer = await page.locator("#result-listing-container")
  await expect(listingContainer).toHaveCount(1, { timeout: 15000 })
  const numListings = await page.locator(".result-quote-item").count()
  await expect(numListings).toBeGreaterThan(0)
  await page.screenshot({ path: "thank_you_page1.jpg" })

  // Test that the response did not fail
  expect(
    response.status(),
    "should respond with correct status code",
  ).toBeLessThan(400)
})

test("desktop, multi car, renter, uninsured", async ({ page }) => {
  const baseUrl = process.env.BASE_URL
  const response = await page.goto(`${baseUrl}/?aid=60&cid=48&sid=checkly_test`)

  // check 5 digit zip code is automatically populated
  await page.waitForTimeout(2000)
  const inputValue = await page.inputValue("#zipcode")
  const regex = /^\d{5}$/
  expect(inputValue).toMatch(regex)

  // click submit
  await page.click(".submit-btn")
  await page.waitForNavigation()

  // trusted form and jornaya lead ID
  const jornayaLeadID = await page.locator("#leadid_token")
  const trustedFormToken = await page.locator("#xxTrustedFormToken_0")
  expect(jornayaLeadID.inputValue()).not.toBe("")
  expect(trustedFormToken.inputValue()).not.toBe("")

  // make sure form loads with vehicle year question
  const vehYear = await page.locator("#car_0_year_2025")
  await expect(vehYear).toHaveCount(1)
  await page.click("label[for='car_0_year_2025']")
  const vehMake = await page.locator("#car_0_make_HON")
  await expect(vehMake).toHaveCount(1)
  await page.click("label[for='car_0_make_HON']")
  const vehModel = await page.locator("#car_0_model_2318")
  await expect(vehModel).toHaveCount(1)
  await page.click("label[for='car_0_model_2318']")

  // second vehicle - yes
  const newVehicle = await page.locator("#second_vehicle_yes")
  await expect(newVehicle).toHaveCount(1)
  await page.click("label[for='second_vehicle_yes']")

  const vehYear2 = await page.locator("#car_1_year_2025")
  await expect(vehYear2).toHaveCount(1)
  await page.click("label[for='car_1_year_2025']")
  const vehMake2 = await page.locator("#car_1_make_FOR")
  await expect(vehMake2).toHaveCount(1)
  await page.click("label[for='car_1_make_FOR']")
  const vehModel2 = await page.locator("#car_1_model_1851")
  await expect(vehModel2).toHaveCount(1)
  await page.click("label[for='car_1_model_1851']")

  // insured no
  const insured = await page.locator("#insured_no")
  await expect(insured).toHaveCount(1)
  await page.click("label[for='insured_no']")

  // homeowner - no
  const homeOwner = await page.locator("#homeowner_no")
  await expect(homeOwner).toHaveCount(1)
  await page.click("label[for='homeowner_no']")

  // DOB
  const dobMonth = await page.locator(".dob-0-month")
  await expect(dobMonth).toHaveCount(1)
  const dobDay = await page.locator(".dob-0-day")
  await expect(dobDay).toHaveCount(1)
  const dobYear = await page.locator(".dob-0-year")
  await expect(dobYear).toHaveCount(1)
  const dobSubmit = await page.locator(".btn-custom").first()
  const dobErrorDiv = await page.locator(".error-msg").first()
  await expect(dobSubmit).toBeVisible()
  await dobSubmit.click()
  await expect(dobErrorDiv).toContainText("Please enter a valid date")
  // Type invalid input
  // await dobMonth.type("13")
  // await dobDay.type("13")
  // await dobYear.type("1981")
  // await dobSubmit.click()
  // await expect(dobErrorDiv).toContainText("Please enter a valid date")
  await dobMonth.click()
  await dobMonth.fill("01")
  await dobDay.click()
  await dobDay.fill("11")
  await dobYear.click()
  await dobYear.fill("1981")
  await dobSubmit.click()
  await expect(dobErrorDiv).toBeEmpty()

  // gender
  const gender = await page.locator("#driver_0_gender_female")
  await expect(gender).toHaveCount(1)
  await page.click("label[for='driver_0_gender_female']")

  // marital
  const marital = await page.locator("#driver_0_married_no")
  await expect(marital).toHaveCount(1)
  await page.click("label[for='driver_0_married_no']")

  // accidents
  const accidents = await page.locator("#driver_0_fault_yes")
  await expect(accidents).toHaveCount(1)
  await page.click("label[for='driver_0_fault_yes']")

  // DUI
  const dui = await page.locator("#driver_0_dui_yes")
  await expect(dui).toHaveCount(1)
  await page.click("label[for='driver_0_dui_yes']")

  // name
  const firstName = await page.locator('input[placeholder="First Name"]')
  const lastName = await page.locator('input[placeholder="Last Name"]')
  await expect(firstName).toBeVisible()
  await expect(lastName).toBeVisible()
  await firstName.fill("Jane")
  await page.waitForTimeout(500)
  await lastName.fill("Doe")
  const nameSubmit = await page.locator(".btn-custom").nth(2)
  await nameSubmit.click()

  // military affiliation
  const military = await page.locator("#military_yes")
  await expect(military).toHaveCount(1)
  await page.click("label[for='military_yes']")

  // address
  const addressSubmit = await page.locator(".btn-custom").nth(3)
  const addressErrorDiv = await page.locator(".error-msg").nth(4)
  const cityErrorDiv = await page.locator(".error-msg").nth(5)
  const zipErrorDiv = await page.locator(".error-msg").nth(7)
  await addressSubmit.click()
  await expect(addressErrorDiv).toContainText("Address is required")
  // await expect(cityErrorDiv).toContainText('City is required');
  // await expect(zipErrorDiv).toContainText('Zip code is required');
  const address = await page.locator('input[placeholder="Address"]')
  // Type a query to trigger auto-suggestions
  await address.type("1600 Amphitheatre Parkway")
  // Wait for suggestions to appear
  const suggestionList = page.locator(".pac-container") // Google Maps Autocomplete suggestions container
  await expect(suggestionList).toBeVisible()
  // Click on the first suggestion
  const firstSuggestion = suggestionList.locator(".pac-item").first()
  await firstSuggestion.click()
  await expect(address).toHaveValue(
    "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  )
  await addressSubmit.click()

  // email
  const emailInput = await page.locator('input[placeholder="Email"]')
  await expect(emailInput).toBeVisible()
  const emailSubmit = await page.locator(".btn-custom").nth(4)
  const emailErrorDiv = await page.locator(".error-msg").nth(8)
  await emailSubmit.click()
  await expect(emailErrorDiv).toContainText("Email is required")
  await emailInput.type("ypendharkar+checklytest@smartfinancial.com")
  await emailSubmit.click()

  // phone
  // const phoneInput = await page.locator('input[name="Phone"]');
  const phoneInput = await page.locator('input[placeholder="(xxx) xxx-xxxx"]')
  await expect(phoneInput).toBeVisible()
  const phoneSubmit = await page.locator("#submit-lead")
  const phoneErrorDiv = await page.locator(".error-msg").nth(9)
  await phoneSubmit.click()
  await expect(phoneErrorDiv).toContainText("Phone number is required")
  await phoneInput.type("8773237750")
  await page.screenshot({ path: "submit_page.jpg" })
  await phoneSubmit.click()

  // thank you page
  // await page.waitForTimeout(7000)
  // await page.screenshot({ path: "thank_you_page.jpg" })
  // const buttons = page.locator(".btn-get-quote")
  // const buttonCount = await buttons.count()
  // expect(buttonCount).toBeGreaterThan(0)
  const listingContainer = await page.locator("#result-listing-container")
  await expect(listingContainer).toHaveCount(1, { timeout: 15000 })
  const numListings = await page.locator(".result-quote-item").count()
  await expect(numListings).toBeGreaterThan(0)
  await page.screenshot({ path: "thank_you_page.jpg" })

  // Test that the response did not fail
  expect(
    response.status(),
    "should respond with correct status code",
  ).toBeLessThan(400)
})
