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

// Define URLs for each lead type
const leadUrls = {
  Auto: 'https://smartfinancial.com/quote/rates.html?aid=60&cid=48&sid=checkly_test&tid=&ks=&zip=77501&lead_type=auto&form_id=1',
  Home: 'https://smartfinancial.com/quote/rates.html?aid=60&cid=48&sid=checkly_test&tid=&ks=&zip=77501&lead_type=home&form_id=1',
  Health: 'https://smartfinancial.com/quote/rates.html?aid=60&cid=48&sid=checkly_test&tid=&ks=&zip=77501&lead_type=health&form_id=1',
  Life: 'https://smartfinancial.com/quote/rates.html?aid=60&cid=48&sid=checkly_test&tid=&ks=&zip=77501&lead_type=life&form_id=1',
  Medicare: 'https://smartfinancial.com/quote/rates.html?aid=60&cid=48&sid=checkly_test&tid=&ks=&zip=77501&lead_type=medicare&form_id=1',
  Commercial: 'https://smartfinancial.com/quote/rates.html?aid=60&cid=48&sid=checkly_test&tid=&ks=&zip=77501&lead_type=commercial&form_id=1',
  Renters: 'https://smartfinancial.com/quote/rates.html?aid=60&cid=48&sid=checkly_test&tid=&ks=&zip=77501&lead_type=renter&form_id=1'
};

 


for (const [leadType, url] of Object.entries(leadUrls)) {
  console.log("Tesinging", url)
  test(`Pop Under Pages for ${leadType} - Mobile`, async ({ browser }) => {
    const deviceNames = ['iPhone 11 Pro', 'iPhone 12', 'Galaxy S8', 'iPhone SE', 'Pixel 5'];
    const selectedDevice = deviceNames[getRandomIndex(deviceNames.length)];
    const dev = devices[selectedDevice];

    const page = await browser.newPage({ ...dev });
    await page.goto(url);
    await final_result(page, leadType, 'Pop_Under_Mobile');
  });

  test(`${leadType} Pop Under Pages for  - Desktop`, async ({ page }) => {
    await page.goto(url);
    await final_result(page, leadType, 'Pop_Under_Desktop');
  });
}

 
 
 



async function final_result(page, leadType, deviceType) {

  await page.waitForSelector('#result-listing-container', { state: 'visible', timeout: 20000 });
  const resultListingContainer = await page.locator('#result-listing-container');
  await expect(resultListingContainer).toBeVisible();
  await page.waitForSelector('.company-insurance-item', { state: 'visible', timeout: 20000 });
  const resultItems = await page.locator('.company-insurance-item');
  const resultCount = await resultItems.count();
  console.log(`for ${leadType} Lead Type  company-insurance-item Count is ${resultCount}`)
  expect(resultCount).toBeGreaterThan(0);
  await page.screenshot({ path: `screenshots/${leadType}_${deviceType}.png`, fullPage: true });

}


function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}
