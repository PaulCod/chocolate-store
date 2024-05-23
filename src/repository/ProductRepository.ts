import { PoolConnection } from "mysql2/promise";
import IDatabaseService from "../interfaces/DatabaseServiceInterface";
import { IProductData, IProductRepository } from "../interfaces/ProductInterfaces";

class ProductRepository implements IProductRepository {
  databaseService: IDatabaseService;

  constructor(databaseService: IDatabaseService) {
    this.databaseService = databaseService
  }

  private async getConnection(): Promise<PoolConnection> {
    return this.databaseService.getConnection();
  }

  async save(product: IProductData): Promise<void> {
    const query = "INSERT INTO `chocolate`(id, name, price, description, img_url) VALUES (?, ?, ?, ?, ?)";
    const values = [product.id, product.name, product.price, product.description, product.imgUrl];
    const connection = await this.getConnection();

    try {
      await connection.execute(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }
  async update(product: IProductData, id: string): Promise<void> {
    const query = "UPDATE `chocolate` SET name = ?, price = ?, description = ? WHERE id = ?";
    const values = [product.name, product.price, product.description, id];
    const connection = await this.getConnection();

    try {
      await connection.execute(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }
  async delete(id: string): Promise<void> {
    const query = "DELETE FROM `chocolate` WHERE id = ?";
    const values = [id];
    const connection = await this.getConnection();

    try {
      await connection.execute(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }
  async getById(id: string): Promise<IProductData> {
    const query = "SELECT * FROM `chocolate` WHERE id = ?";
    const values = [id];
    const connection = await this.getConnection();
  
    try {
      const [row] = await connection.execute(query, values);
      
      if (row) {
        return row as unknown as IProductData;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }
  async getAll(): Promise<IProductData[]> { 
    const query = "SELECT * FROM `chocolate`";
    const connection = await this.getConnection();

    try {
      const [rows] = await connection.execute(query);
      return rows as IProductData[];
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default ProductRepository;