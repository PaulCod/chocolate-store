import JwtHandler from "./jwtHandle"

describe("JwtHandler", () => {

  it("generateToken", () => {
    const token = JwtHandler.generateToken("d2eb2984-2e7e-4212-87b6-f5b1fb584871", "paulo@gmail.com")
    expect(token).toBeDefined()
  })

  it("verifyToken", () => {
    const token = JwtHandler.generateToken("d2eb2984-2e7e-4212-87b6-f5b1fb584871", "paulo@gmail.com")

    const result = JwtHandler.verifyToken(token)
    expect(result).toBeDefined()
    expect(result).not.toEqual(false)
  })
})