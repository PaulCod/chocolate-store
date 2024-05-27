import {describe, expect, test} from "@jest/globals"
import UserModel from "./UserModel"


describe("User Model", () => {
  test("should create a new user", () => {
    let userData = {
      name: 'test',
      email: 'test',
      password: 'test',
      userId: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }

    const user = new UserModel(userData)

    expect(user).toBeInstanceOf(UserModel)
    expect(user.userId).toBeDefined()
    expect(user.name).toBe('test')
    expect(user.email).toBe('test')
    expect(user.password).toBe('test')
  })

  test("should format data", async () => {
    let userData = {
      name: 'test  ',
      email: 'test',
      password: 'test',
      userId: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }

    const user = new UserModel(userData)

    user.formatData()

    expect(user).toBeInstanceOf(UserModel)
    expect(user.userId).toBeDefined()
    expect(user.name).toBe('test')
    expect(user.email).toBe('test')
  })

  test("should hash password", async () => {
    let userData = {
      name: 'test',
      email: 'test',
      password: 'test',
      userId: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }

    const user = new UserModel(userData)

    await user.hashPassword()

    expect(user).toBeInstanceOf(UserModel)
    expect(user.userId).toBeDefined()
    expect(user.name).toBe('test')
    expect(user.email).toBe('test')
    expect(user.password).not.toBe('test')
  })
})
