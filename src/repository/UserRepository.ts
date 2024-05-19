import { PoolConnection } from "mysql2/promise";
import IDatabaseService from "../interfaces/DatabaseServiceInterface";
import { IUserData, IUserRepository, IUserRepositoryAttributes } from "../interfaces/UserInterface";

class UserRepository implements IUserRepository, IUserRepositoryAttributes {
  databaseService: IDatabaseService;

  constructor(databaseService: IDatabaseService) {
    this.databaseService = databaseService;
  }
  closePool(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private async getConnection(): Promise<PoolConnection> {
    return this.databaseService.getConnection();
  }

  async save(user: IUserData): Promise<void> {
    const query = "INSERT INTO `users`(id, name, email, password) VALUES (?, ?, ?, ?)";
    const values = [user.id, user.name, user.email, user.password];
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

  async update(user: IUserData, id: string): Promise<void> {
    const query = "UPDATE `users` SET name = ? WHERE id = ?";
    const values = [user.name, id];
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
    const query = "DELETE FROM `users` WHERE id = ?";
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

  async getById(id: string): Promise<IUserData> {
    const query = "SELECT id, name, email, password FROM `users` WHERE id = ?";
    const values = [id];
    const connection = await this.getConnection();

    try {
      const [rows] = await connection.execute(query, values);
      const users = rows as IUserData[];
      if (users.length > 0) {
        return users[0];
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async getByEmail(email: string): Promise<IUserData[]> {
    const query = "SELECT id, name, email, password FROM `users` WHERE email = ?";
    const values = [email];
    const connection = await this.getConnection();

    try {
      const [rows] = await connection.execute(query, values);
      return rows as IUserData[];
    } catch (error) {
      console.log(error);
      throw error;
    } finally{
      connection.release();
    }
  } 
}

export default UserRepository;
