import { Router } from "express";
import { IUserController } from "../interfaces/UserInterface";

class UserRoutes {
  public router: Router;
  public userController: IUserController;

  constructor(userController: IUserController) {
    this.router = Router();
    this.userController = userController;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/users', this.userController.createUser.bind(this.userController));
    this.router.get('/users/:id', this.userController.getUser.bind(this.userController));
    this.router.put('/users/:id', this.userController.updateUser.bind(this.userController));
    this.router.delete('/users/:id', this.userController.deleteUser.bind(this.userController));
  }
}

export default UserRoutes;
