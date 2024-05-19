import { Connection } from "mysql2";
import IDatabaseService from "../interfaces/DatabaseServiceInterface";
import { IUserData, IUserRepository, IUserRepositoryAttributes } from "../interfaces/UserInterface";

class UserRepository implements IUserRepository, IUserRepositoryAttributes {
  databaseService: IDatabaseService;
  private db: Connection

  constructor(databaseService: IDatabaseService) {
    this.databaseService = databaseService
    this.db = this.databaseService.getConnection()
  }
  
  async save(user: IUserData): Promise<void> {
    const query = "INSERT INTO `users`(id, name, email, password) VALUES (?, ?, ?, ?)"
    const values = [user.id, user.name, user.email, user.password]

    try {
      this.db.execute(query, values)
      return
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update(user: IUserData, id: string): Promise<void> {
    const query = "UPDATE `users` SET name = ?, WHERE id = ?"
    const values = [user.name, id]

    try {
      this.db.execute(query, values)
      return
    } catch(err) {
      console.log(err)
      throw err
    }
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getById(id: string): Promise<IUserData> {
    throw new Error("Method not implemented.");
  }

}

export default UserRepository 