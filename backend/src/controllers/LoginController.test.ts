import { Request, Response } from "express";
import { ILoginController } from "../interfaces/LoginInterface";
import { IUserRepository } from "../interfaces/UserInterface";
import LoginController from "./LoginController";
import BcryptUtils from "../utils/auth/bcryptUtils";

describe("LoginController", () => {
  let loginController: ILoginController;
  let mockUserRepository: IUserRepository

  beforeEach(() => {
    mockUserRepository = {
      getByEmail: jest.fn()
    } as unknown as jest.Mocked<IUserRepository>;

    loginController = new LoginController(mockUserRepository)
  });

  describe("login", () => {
    it("should return an error if email and password are not provided", async () => {
      const req = {
        body: {
          email: "",
          password: ""
        }
      } as unknown as Request
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response

      loginController.login(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({message: ['Email and password are required']})
    })

    it("should return an error if password is invalid", async () => {
      const req = {
        body: {
          email: "email",
          password: "ksjd"
        }
      } as unknown as Request
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response

      loginController.login(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({message: ['Password must be at least 6 characters long']})
    })

    it("should return an error if email is invalid", async () => {
      const req = {
        body: {
          email: "emailsss",
          password: "lslsllslsls"
        }
      } as unknown as Request
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response

      loginController.login(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({message: ['Invalid email']})
    })

    it("should return an error if user not found", async () => {
      (mockUserRepository.getByEmail as jest.Mock).mockResolvedValue(null)
      const req = {
        body: {
          email: "email@email.com",
          password: "password"
        }
      } as unknown as Request
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response

      await loginController.login(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({message: ['User not found']})
    })

    it("should return an error if password is incorrect", async () => {
      (mockUserRepository.getByEmail as jest.Mock).mockResolvedValue({email: "email@email.com", password: "password"})
      const req = {
        body: {
          email: "email@email.com",
          password: "passwor"
        }
      } as unknown as Request
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response

      await loginController.login(req, res)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({message: ['Invalid password']})
    })

    it("should return a token", async () => {
      (mockUserRepository.getByEmail as jest.Mock).mockResolvedValue({email: "email@email.com", password: await BcryptUtils.hashPassword("password")})
      const req = {
        body: {
          email: "email@email.com",
          password: "password"
        }
      } as unknown as Request
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response

      await loginController.login(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({token: expect.any(String)})
    })
  })
})