

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
 

test("Auto Rapidfire Prefill Lead Mobile Test", async ({ browser }) => {

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

  
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://smartfinancial.com/get-fast-quote.html#/quote-ready?session_id=55639387-01f2-4b28-924b-2aa9b6a6f776');
  await phone_step(page)
  await final_result(page)
})



test('Auto Rapidfire Prefill Lead Desktop Test ', async ({ page }) => {
  // Change checklyhq.com to your site's URL,
  // or, even better, define a ENVIRONMENT_URL environment variable
  // to reuse it across your browser checks
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://smartfinancial.com/get-fast-quote.html#/quote-ready?session_id=55639387-01f2-4b28-924b-2aa9b6a6f776');
  await phone_step(page)
  await final_result(page) 

})



 
 

 

async function phone_step(page) {
  // Locate the phone input section
  const phone_div = page.locator('.quote-ready-page');
  await expect(phone_div).toBeVisible();

  // //console.log(await page.content());


  // const leadIdTokenElement = await page.locator('#leadid_token');
  // const leadIdToken = await page.locator('#leadid_token').getAttribute('value');

  // // Check if the element exists by asserting it
  // expect(await leadIdTokenElement.count()).toBeGreaterThan(0); 
  // expect(leadIdToken).not.toBeNull(); // Ensure the value is not null
  // expect(leadIdToken).not.toBe(''); // Ensure the value is not empty

   // Check if phone input has a specific value
  const phoneInputValue = await page.inputValue('input[name="phone"]');
  expect(phoneInputValue).toBe('(855) 555-5555'); // Ensure the phone input value is exactly '(855) 555-5555'
  
   
  const viewRates = await page.locator("button.quote-continue");
 

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


 


 



 