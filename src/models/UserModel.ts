import { IUserData, IUserMethods } from "../interfaces/UserInterface";
import {v4 as uuidv4} from "uuid"
import BcryptUtils from "../utils/auth/bcryptUtils";

class UserModel implements IUserData, IUserMethods {
  userId: string | undefined;
  name: string;
  email: string;
  password: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;

  constructor(data: IUserData) {
    this.userId = data.userId ?? uuidv4()
    this.name = data.name
    this.email = data.email
    this.password = data.password
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

  formatData(): void {
    this.name = this.name.trim()
    this.email = this.email.trim()
  }

  async hashPassword(): Promise<void> {
    if(this.password) {
      this.password = await BcryptUtils.hashPassword(this.password)
    }
  }
}

export default UserModel