  import {Request, Response} from 'express'
  import { IUserController, IUserRepository } from "../interfaces/UserInterface";
  import UserModel from '../models/UserModel';
  import checkUserData from '../utils/checkData/checkUserData';

  class UserController implements IUserController {
    userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
      this.userRepository = userRepository
    }
    
    async createUser(req: Request, res: Response): Promise<void> {
      const user = new UserModel(req.body)
      
      try {
        user.formatData()
        await user.hashPassword()

        checkUserData.checkAllData(user)
        if (checkUserData.errors.length > 0) {
          res.status(400).json({message: checkUserData.errors})
          return
        }
        
        await this.userRepository.save(user)

        res.status(201).json({
          message: ['User created'],
        })

        return
      } catch (error) {
        console.log(error)
        res.status(500).json({message: ['Internal server error']})
        return
      }
    }
    async getUser(req: Request, res: Response): Promise<void> {
      const id: string = req.params.id

      if (!id || id === '') {
        res.status(400).json({message: ['Id is required']})
        return
      }

      try {
        const user = await this.userRepository.getById(id)
        if (!user) {
          res.status(404).json({message: ['User not found']})
          return
        }

        res.status(200).json(user)
      } catch (error) {
        res.status(500).json({message: ['Internal server error']})
        return
      }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
      const id: string = req.params.id

      if (!id || id === '') {
        res.status(400).json({message: ['Id is required']})
      }

      const user = new UserModel(req.body)
      user.formatData()

      if (checkUserData.checkName(user.name)) {
        res.status(400).json({message: ['Name must be at least 3 characters long']})
        return
      }

      if (checkUserData.checkEmail(user.email)) {
        res.status(400).json({message: ['Email must be valid']})
        return
      }

      try {
        const userExists = await this.userRepository.getById(id)
        if (!userExists) {
          res.status(404).json({message: ['User not found']})
          return
        }

        await this.userRepository.update(user, id)

        res.status(200).json({message: ['User updated']})

        return
      } catch(error) {
        res.status(500).json({message: ['Internal server error']})
        return
      }
    }
    async deleteUser(req: Request, res: Response): Promise<void> {
      const id: string = req.params.id

      if (!id || id === '') {
        res.status(400).json({message: ['Id is required']})
        return
      }

      try {
        const user = await this.userRepository.getById(id)
        if (!user) {
          res.status(404).json({message: ['User not found']})
          return
        }

        await this.userRepository.delete(id)
        res.status(200).json({message: ['User deleted']})
        return
      } catch (error) {
        res.status(500).json({message: ['Internal server error']})
        return
      }
    }
  }

  export default UserController