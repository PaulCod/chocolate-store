import { Request, Response } from "express";
import { IOrderRepository } from "../interfaces/OrderInterface";
import OrderController from "./OrderController";

describe("OrderController", () => {
  let mockOrderRepository: IOrderRepository
  let orderController: OrderController

  beforeAll(() => {
    mockOrderRepository = {
      save: jest.fn(),
      delete: jest.fn(),
      getAll: jest.fn()
    }

    orderController = new OrderController(mockOrderRepository)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  describe("createOrder", () => {
    it("should create an order", async () => {
      const req = {
        body: {
          userId: "1",
          order: {
            status: "pending",
            totalAmount: 10
          },
          items: [
            {
              orderId: "1",
              chocolateId: "1",
              quantity: 1
            }
          ]
        }
      } as unknown as Request

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      
      await orderController.createOrder(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        message: ["Order created"]
      })
    })
  })

  describe("deleteOrder", () => {
    it("should delete an order", async () => {
      const req = {
        body: {
          orderId: "1"
        },
        params: {
          id: "1"
        }
      } as unknown as Request

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      
      await orderController.deleteOrder(req, res)

      expect(res.status).toHaveBeenCalledWith(204)
      expect(res.json).toHaveBeenCalledWith({
        message: ["Order deleted"]
      })
    })
  })

  describe("getOrders", () => {
    it("should get all orders", async () => {
      const ordersMock = [
        { id: "1", status: "pending", totalAmount: 10 },
        { id: "2", status: "completed", totalAmount: 20 }
      ];
  
      (mockOrderRepository.getAll as jest.Mock).mockResolvedValue(ordersMock);
  
      const req = { body: { userId: "1" } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
      await orderController.getOrders(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: ordersMock });
    })
  })
})