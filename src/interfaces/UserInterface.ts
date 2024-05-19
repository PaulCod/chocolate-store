import {Request, Response} from 'express'
import IDatabaseService from './DatabaseServiceInterface'

interface IUserData {
  id: string | undefined
  name: string
  email: string
  password: string | undefined
  createdAt: Date | undefined
  updatedAt: Date | undefined
}

interface IUserMethods {
  formatData(): void
  hashPassword(): Promise<void>
}

interface IUserController {
  createUser(req: Request, res: Response): Promise<void>
  getUser(req: Request, res: Response): Promise<void>
  updateUser(req: Request, res: Response): Promise<void>
  deleteUser(req: Request, res: Response): Promise<void>
}

interface IUserRepositoryAttributes {
  databaseService: IDatabaseService
}

interface IUserRepository {
  save(user: IUserData): Promise<void>
  update(user: IUserData, id: string): Promise<void>
  delete(id: string): Promise<void>
  getById(id: string): Promise<IUserData>
  getByEmail(email: string): Promise<IUserData[]>
}

export { IUserData, IUserMethods, IUserController, IUserRepository, IUserRepositoryAttributes }