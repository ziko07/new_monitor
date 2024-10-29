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


test("Cookie, Articles and Blog Mobile Test", async ({ browser }) => {

 
// Randomly select a device from the list
const deviceNames = ['iPhone 11 Pro', 'iPhone 12', 'Galaxy S8', 'iPhone SE', 'Pixel 5'];
const randomIndex = getRandomIndex(deviceNames.length);
const selectedDevice = deviceNames[randomIndex];
const dev = devices[selectedDevice];

const page = await browser.newPage({
  ...dev,
});

// Navigate to the specified URL
const baseUrl = process.env.BASE_URL;
const response = await page.goto(baseUrl || 'https://smartfinancial.com/');
await cookie_banner(page)
await article_test(page, "Mobile");
      
});

test('Cookie, Articles and Blog Desktop Test ', async ({ page }) => {
  // Change checklyhq.com to your site's URL,
  // or, even better, define a ENVIRONMENT_URL environment variable
  // to reuse it across your browser checks
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://smartfinancial.com/');
  await cookie_banner(page)
  await article_test(page, "Desktop");
})

async function cookie_banner(page) {
  // Locate the cookie banner by its id
  const cookieBanner = await page.locator('#cookie-banner');

  // Verify the banner is visible on the page
  await expect(cookieBanner).toBeVisible();

  // Locate the close button within the cookie banner
  const closeButton = cookieBanner.locator('#close-banner-btn');

  // Click the close button to dismiss the banner
  await closeButton.click();

  
  await expect(cookieBanner).not.toBeVisible()
  
}




async function article_test(page, type) {

  const sourceOfFundSection = await page.locator('#source-of-fund');
  const sectionText = await sourceOfFundSection.textContent();
  //console.log(`source of fund Text : ${sectionText}`)

  expect(sectionText).toContain("Learn More & Find the Best Insurance Quotes");

  const popularSourceItems = await sourceOfFundSection.locator('.popular-source-item');
  const popularItemCount = await popularSourceItems.count();
  console.log(`Number of .popular-source-item elements for ${type} is : ${popularItemCount}`);
  expect(popularItemCount).toBeGreaterThan(0); // Replace with an exact count if known

  const articleItems = await sourceOfFundSection.locator('.article-item');
  const articleItemCount = await articleItems.count();
  console.log(`Number of .article-item elements for ${type} is: ${articleItemCount}`);
  expect(articleItemCount).toBeGreaterThan(0); // Replace with an exact count if known

  //article-section
  const articleSection = await page.locator('#article-section');
  const articleText = await articleSection.textContent();
  //console.log(`source of fund Text : ${sectionText}`)
  expect(articleText).toContain("Explore Our Recent Guides & Articles");

  //

  const categoryArticles = await articleSection.locator('.category-article');
  const categoryArticleCount = await categoryArticles.count();
  console.log(`Number of .category-article elements for ${type} is : ${categoryArticleCount}`);
  expect(categoryArticleCount).toBeGreaterThan(0); // Replace with an exact count if known

  
}

 



function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}



 