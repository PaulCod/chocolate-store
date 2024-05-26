import { IOrderData, IOrderItemData, IOrderRepository } from "../interfaces/OrderInterface";
import OrderRepository from "./OrderRepository";
import OrderModel from "../models/OrderModel";
import { ORDER_GET_ALL_QUERY } from "../constants/constants";

describe("OrderRepository", () => {
  let mockDatabaseService: any;
  let orderRepository: IOrderRepository;
  let mockConnection: any;

  beforeEach(() => {
    mockConnection = {
      beginTransaction: jest.fn().mockResolvedValue(undefined),
      commit: jest.fn().mockResolvedValue(undefined),
      rollback: jest.fn().mockResolvedValue(undefined),
      query: jest.fn().mockResolvedValue(undefined),
      release: jest.fn().mockResolvedValue(undefined),
    };

    mockDatabaseService = {
      getConnection: jest.fn().mockResolvedValue(mockConnection),
    };

    orderRepository = new OrderRepository(mockDatabaseService);
  });

  describe("save", () => {
    it("should save an order in the database", async () => {
      const order = {
        id: "1",
        userId: "1",
        status: "pending",
        totalAmount: 10,
        createdAt: undefined,
      };
      const mockOrder = new OrderModel(order);
      const orderItems: IOrderItemData[] = [
        {
          orderId: "1",
          chocolateId: "1",
          quantity: 1,
        },
      ];
  
      await orderRepository.save(mockOrder, orderItems);
  
      expect(mockDatabaseService.getConnection).toHaveBeenCalledTimes(1);
      expect(mockConnection.beginTransaction).toHaveBeenCalledTimes(1);
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO `orders`"),
        [mockOrder.id, mockOrder.userId, mockOrder.status, mockOrder.totalAmount]
      );
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO `order_items`"),
        [mockOrder.id, orderItems[0].chocolateId, orderItems[0].quantity]
      );
      expect(mockConnection.commit).toHaveBeenCalledTimes(1);
      expect(mockConnection.release).toHaveBeenCalledTimes(1);
    });
  
    it("should throw an error if the save fails", async () => {
      const order = {
        id: "1",
        userId: "1",
        status: "pending",
        totalAmount: 10,
        createdAt: undefined,
      };
      const mockOrder = new OrderModel(order);
      const orderItems: IOrderItemData[] = [
        {
          orderId: "1",
          chocolateId: "1",
          quantity: 1,
        },
      ];
      mockConnection.query.mockRejectedValue(new Error("Failed to save order"));
  
      await expect(orderRepository.save(mockOrder, orderItems)).rejects.toThrow("Failed to save order");
      expect(mockConnection.release).toHaveBeenCalledTimes(1);
      expect(mockConnection.rollback).toHaveBeenCalledTimes(1);
    })
  })

  describe("delete", () => {
    it("should delete an order from the database", async () => {
      const orderId = "1";
  
      await orderRepository.delete(orderId);
  
      expect(mockDatabaseService.getConnection).toHaveBeenCalledTimes(1);
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining("DELETE FROM `orders`"),
        [orderId]
      );
      expect(mockConnection.release).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the delete fails", async () => {
      const orderId = "1";
      mockConnection.query.mockRejectedValue(new Error("Failed to delete order"));
  
      await expect(orderRepository.delete(orderId)).rejects.toThrow("Failed to delete order");
      expect(mockConnection.release).toHaveBeenCalledTimes(1);
    })
  })

  describe("getAll", () => {
    it("should get all orders from the database", async () => {
      const orders: IOrderData[] = [
        {
          id: "1",
          userId: "1",
          status: "pending",
          totalAmount: 10,
          createdAt: undefined,
        },
      ];
  
      mockConnection.query.mockResolvedValueOnce([orders, []] as any);
  
      const result = await orderRepository.getAll("1");
  
      expect(mockDatabaseService.getConnection).toHaveBeenCalledTimes(1);
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining(ORDER_GET_ALL_QUERY),
        ["1"]
      );
      expect(mockConnection.release).toHaveBeenCalledTimes(1);
      expect(result).toEqual(orders);
    })

    it("should throw an error if the get all fails", async () => {
      const errorMessage = 'Get all orders failed';
      mockConnection.query.mockRejectedValueOnce(new Error(errorMessage));
  
      await expect(orderRepository.getAll("1")).rejects.toThrow(errorMessage);
      expect(mockConnection.release).toHaveBeenCalledTimes(1);
    })
  })
});
