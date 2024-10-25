import { test, expect } from "@playwright/test"

test.describe("Check contactability.com and admin", () => {

  test("Contactability.com", async ({ request }) => {
    const response = await request.get(`https://contactability.com/`)
    expect(response).toBeOK()
  })

  test("Contactability Admin", async ({ request }) => {
    const response = await request.get(`https://contactability.com/admin/users`)
    expect(response).toBeOK()
  })

  test("Contactability Admin Manage", async ({ request }) => {
    const response = await request.get(`https://contactability.com/admin/users/22247/manage`)
    expect(response).toBeOK()
  })
})
