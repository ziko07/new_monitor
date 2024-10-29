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
test.setTimeout(310000)

// Set the action timeout to 10 seconds to quickly identify failing actions.
// By default Playwright Test has no timeout for actions (e.g. clicking an element).
test.use({ actionTimeout: 20000 })


 

const urls = [
  { url: 'https://smartfinancial.com/auto-insurance', zipName: 'zip' },
  { url: 'https://generateinsurancequotes.com/', zipName: 'zipcode' },
  { url: 'https://unitedstatesinsurance.com/', zipName: 'zip' },
  { url: 'https://homeownersinsurancecompare.com/', zipName: 'zip' },
  { url: 'https://fastinsurancerates.com/', zipName: 'zipcode' },
  { url: 'https://cheap-car-insurance-quotes.com/', zipName: 'zipcode' },
  { url: 'https://national-auto-insurance-quotes.com/', zipName: 'zipcode' },
  { url: 'http://home-insurance.io', zipName: 'zipcode' },
  { url: 'http://compare-health-plans.net', zipName: 'zipcode' },
  { url: 'http://official-car-insurance.com', zipName: 'zipcode' },
  { url: 'http://greencoinsurance.com', zipName: 'zipcode' },
  { url: 'http://healthcare-rates.org', zipName: 'zipcode' }
];

 

urls.forEach(({ url, zipName }) => {
  test(`${url} zip mobile check`, async ({ browser }) => {

    const deviceNames = ['iPhone 11 Pro', 'iPhone 12', 'Galaxy S8', 'iPhone SE', 'Pixel 5'];
    const selectedDevice = deviceNames[getRandomIndex(deviceNames.length)];
    const dev = devices[selectedDevice];

    const page = await browser.newPage({ ...dev });
    await page.goto(url);

    await zip_check(page, url, zipName)
  });

  test(`${url} zip Desktop check`, async ({ page }) => {
    await page.goto(url);
    await zip_check(page, url, zipName)
  });


});




async function zip_check(page, url ,zipName) {

  const zipSelector = `input[name="${zipName}"]`;
  await page.waitForSelector(zipSelector, { timeout: 10000 });

  let zipValue;
  const maxRetries = 3; // maximum number of attempts
  const delay = 2000; // 1-second delay between attempts

  for (let i = 0; i < maxRetries; i++) {
    zipValue = await page.inputValue(zipSelector);
    if (/^\d{5}$/.test(zipValue)) { // checks if it matches a 5-digit ZIP code
      console.log(`Updated ZIP code value for ${url}: ${zipValue}`);
      break;
    }
    await page.waitForTimeout(delay);
    
  }
  console.log(`zip for ${url} is ${zipValue}`)
  // Final check:  
  expect(zipValue).toMatch(/^\d{5}$/);
  

  
}

 




function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

