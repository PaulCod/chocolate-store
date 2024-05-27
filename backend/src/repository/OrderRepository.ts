import { PoolConnection } from "mysql2/promise";
import IDatabaseService from "../interfaces/DatabaseServiceInterface";
import { IFormattedOrderData, IOrderData, IOrderItemData, IOrderRepository } from "../interfaces/OrderInterface";
import { ORDER_DELETE_QUERY, ORDER_GET_ALL_QUERY } from "../constants/constants";


class OrderRepository implements IOrderRepository {
  databaseService: IDatabaseService;

  constructor(databaseService: IDatabaseService) {
    this.databaseService = databaseService;
  }

  private async getConnection(): Promise<PoolConnection> {
    return this.databaseService.getConnection();
  }

  async save(order: IOrderData, items: IOrderItemData[]): Promise<void> {
    const connection = await this.getConnection();

    try {
      await connection.beginTransaction();

      const orderQuery = "INSERT INTO `orders`(id, user_id, status, total_amount) VALUES (?, ?, ?, ?)";
      const orderValues = [order.id, order.userId, order.status, order.totalAmount];
      await connection.query(orderQuery, orderValues);

      const itemQuery = "INSERT INTO `order_items`(order_id, chocolate_id, quantity) VALUES (?, ?, ?)";
      for (const item of items) {
        const itemValues = [order.id, item.chocolateId, item.quantity];
        await connection.query(itemQuery, itemValues);
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async delete(id: string): Promise<void> {
    const values = [id];
    const connection = await this.getConnection();

    try {
      await connection.query(ORDER_DELETE_QUERY, values);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async getAll(userId: string): Promise<IFormattedOrderData[]> {
    const values = [userId];
    const connection = await this.getConnection();

    try {
      const [rows] = await connection.query(ORDER_GET_ALL_QUERY, values);
      return rows as IFormattedOrderData[];
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default OrderRepository;
