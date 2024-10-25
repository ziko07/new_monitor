import { test, expect } from "@playwright/test"

const baseUrl = "https://api.smartfinancial.com/api/v2/vehicle"

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

test.beforeAll(async ({ request }) => {
  const rndInt = randomIntFromInterval(1990, 2024);
  process.env.VEHICLE_YEAR = rndInt;
})

test("Vehicles V3", async ({ request }) => {

  /**
   * Get all Makes
   */
  const makes = await test.step("get makes", async () => {
    const response = await request.get(`${baseUrl}/makes?year={{VEHICLE_YEAR}}`)
    expect(response).toBeOK()

    const data = await response.json()
    expect(data.makes.length).toBeGreaterThan(0)

    return data
  })

  /**
   * Get models for the year/make
   */
  const [make, models] = await test.step("get models", async () => {
    const iter = randomIntFromInterval(0, makes.makes.length-1);
    const make = makes.makes[iter].code;
    const response = await request.get(`${baseUrl}/models?make=${make}&year={{VEHICLE_YEAR}}`)
    expect(response).toBeOK()

    const models = await response.json()
    expect(models.models.length).toBeGreaterThan(0)

    return [make, models]
  })

  /**
   * Get trims for year/make/model
   */
  const trims = await test.step("get trims", async () => {
    const iter = randomIntFromInterval(0, models.models.length - 1);
    const model = models.models[iter].code;
    const response = await request.get(`${baseUrl}/trims?make=${make}&model=${model}&year={{VEHICLE_YEAR}}`)
    expect(response).toBeOK()

    const trims = await response.json()
    expect(trims.styles.length).toBeGreaterThan(0)
  })
})
