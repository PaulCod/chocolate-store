import { IUserRepository } from "../interfaces/UserInterface";
import { Request, Response } from "express";
import UserController from "./UserController";

describe("UserController", () => {
  let mockUserRepository: IUserRepository;
  let userController: UserController;

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn(),
      getById: jest.fn(),
      getByEmail: jest.fn().mockResolvedValue([]),
      delete: jest.fn(),
      update: jest.fn(),
    } as unknown as IUserRepository;
    userController = new UserController(mockUserRepository);
  });

  describe("createUser", () => {
    it("should create a user successfully", async () => {
      const req = {
        body: {
          name: "John Doe", 
          email: "john.doe@example.com", 
          password: "password123", 
          id: undefined, 
          createdAt: undefined, 
          updatedAt: undefined
        }
      } as unknown as Request;

      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: ["User created"],
      });
    });

    it("should return an error if user already exists", async () => {
      mockUserRepository.getByEmail = jest.fn().mockResolvedValue([{}]); // Simula usuário existente

      const req = {
        body: {
          name: "John Doe", 
          email: "john.doe@example.com", 
          password: "password123", 
        }
      } as unknown as Request;

      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: ['User already exists'],
      });
    });
  });

  describe("getUser", () => {
    it("should return user by id", async () => {
      const mockUser = { id: "1", name: "John Doe", email: "john.doe@example.com" };
      mockUserRepository.getById = jest.fn().mockResolvedValue(mockUser);

      const req = { params: { id: "1" } } as unknown as Request;
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.getUser(req, res)
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    })

    it("should return 404 if user not found", async () => {
      mockUserRepository.getById = jest.fn().mockResolvedValue(null);

      const req = { params: { id: "1" } } as unknown as Request;
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.getUser(req, res)
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: ['User not found'],
      });
    })

    it("should return 400 if id is not provided", async () => {
      const req = { params: { id: "" } } as unknown as Request;
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.getUser(req, res)
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: ['Id is required'],
      });
    })
  })

  describe("updateUser", () => {
    it("should update user successfully", async () => {
      const mockUser = { id: "1", name: "John Doe", email: "john.doe@example.com" };
      mockUserRepository.getById = jest.fn().mockResolvedValue(mockUser);
      mockUserRepository.update = jest.fn();

      const req = {
        params: "1",
        body: {name: "Jane Doe"}
      } as unknown as Request;
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.updateUser(req, res)
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: ['User updated'],
      });
    })

    it("should return 404 if name is invalid", async () => {
      const req = {
        params: "1",
        body: {name: "JD"}
      } as unknown as Request;
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.updateUser(req, res)
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: ['Name must be at least 3 characters long'],
      });
    })

    it("should return 404 if user not found", async () => {
      mockUserRepository.getById = jest.fn().mockResolvedValue(null);

      const req = {
        params: "1",
        body: {name: "Jane Doe"}
      } as unknown as Request;
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.updateUser(req, res)
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: ['User not found'],
      });
    })
    
    it("should return 400 if id is not provided", async () => {
      const req = {
        params: "1",
        body: {name: "JD"}
      } as unknown as Request;
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.updateUser(req, res)
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: ['Id is required'],
      })
    })
  })

  describe("deleteUser", () => {
    it("should delete user successfully", async () => {
      const mockUser = { id: "1", name: "John Doe", email: "john.doe@example.com" };
      mockUserRepository.getById = jest.fn().mockResolvedValue(mockUser);
      
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.deleteUser(req, res)
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: ['User deleted'],
      });
    })

    it("should return 404 if user not found", async () => {
      mockUserRepository.getById = jest.fn().mockResolvedValue(null);

      const req = { params: { id: "1" } } as unknown as Request;
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.deleteUser(req, res)
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: ['User not found'],
      });
    })

    it("should return 400 if id is not provided", async () => {
      const req = { params: { id: "" } } as unknown as Request;
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response;

      await userController.deleteUser(req, res)
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: ['Id is required'],
      })
    })
  })
});
