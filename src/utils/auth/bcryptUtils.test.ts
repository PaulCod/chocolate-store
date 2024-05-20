import BcryptUtils from "./bcryptUtils"

describe("BcryptUtils", () => {
  it("should hash a password", async () => {
    const password = "password123"
    const hash = await BcryptUtils.hashPassword(password)
    expect(hash).not.toBe(password)
  })

  it("should compare a password", async () => {
    const password = "password123"
    const hash = await BcryptUtils.hashPassword(password)
    const result = await BcryptUtils.comparePassword(password, hash)
    expect(result).toBe(true)
  })

  it("should not compare a password", async () => {
    const password = "password123"
    const hash = await BcryptUtils.hashPassword("wrongpassword")
    const result = await BcryptUtils.comparePassword(password, hash)
    expect(result).toBe(false)
  })

  it("should not compare an empty password", async () => {
    const password = ""
    const hash = await BcryptUtils.hashPassword("wrongpassword")
    const result = await BcryptUtils.comparePassword(password, hash)
    expect(result).toBe(false)
  })
})