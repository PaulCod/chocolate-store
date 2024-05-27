import {Request, Response} from 'express'
import { ILoginController, ILoginData } from "../interfaces/LoginInterface";
import { IUserRepository } from "../interfaces/UserInterface";
import BcryptUtils from '../utils/auth/bcryptUtils';
import JwtHandler from '../utils/auth/jwtHandle';
import { CheckUserData } from '../utils/checkData/checkUserData';

class LoginController implements ILoginController {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: ILoginData = req.body;

      if (!loginData.email || !loginData.password) {
        res.status(400).json({ message: ['Email and password are required'] });
        return;
      }

      const checkUserData = new CheckUserData();

      checkUserData.checkPassword(loginData.password)
      if(checkUserData.errors.length > 0) {
        res.status(400).json({ message: checkUserData.errors });
        return;
      }

      checkUserData.checkEmail(loginData.email)
      if (checkUserData.errors.length > 0) {
        res.status(400).json({ message: checkUserData.errors });
        return;
      }

      const user = await this.userRepository.getByEmail(loginData.email);
      
      if (!user) {
        res.status(404).json({ message: ['User not found'] });
        return;
      }

      const validPassword = await BcryptUtils.comparePassword(loginData.password, user.password as string)
      if (!validPassword) {
        res.status(401).json({ message: ['Invalid password'] });  
        return;
      }
      const token = JwtHandler.generateToken(user.userId as string, user.email);
      
      res.status(200).json({ 
        token: `Bearer ${token}`
       });
    } catch(errors) {
      res.status(500).json({ message: ['Internal server error'] });
    }
  }
}

export default LoginController