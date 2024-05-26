import { Request, Response } from "express";
import { IOrderController, IOrderRepository, IOrderData, IOrderItemData } from "../interfaces/OrderInterface";
import Order from "../models/OrderModel";
import OrderItem from "../models/OrderItemModel";

class OrderController implements IOrderController {
  orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    const order = new Order(req.body.order)
    const items: IOrderItemData[] = []
    for (const item of req.body.items) {
      items.push(new OrderItem(item))
    }
    try {
      await this.orderRepository.save(order, items);
      res.status(201).json({
        message: ["Order created"]
      })
    } catch (error) {
      res.status(500).json({
        message: ["Internal server error"]
      })
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      await this.orderRepository.delete(id);
      res.status(204).send();
    } catch(error) {
      res.status(500).json({
        message: ["Internal server error"]
      })
    }
  }

  async getOrders(req: Request, res: Response): Promise<void> {
    const { userId } = req.body;
    try {
      const orders = await this.orderRepository.getAll(userId);
      res.status(200).json({
        message: orders
      });
    } catch(error) {
      res.status(500).json({
        message: ["Internal server error"]
      })
    }
  }
}

export default OrderController;
