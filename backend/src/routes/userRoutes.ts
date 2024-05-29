import { Router } from "express";
import { IUserController } from "../interfaces/UserInterface";
import AuthUserMiddleware from "../middlewares/AuthUser";

class UserRoutes {
  public router: Router;
  public userController: IUserController;
  public authUserMiddleware: AuthUserMiddleware

  constructor(userController: IUserController) {
    this.router = Router();
    this.userController = userController;
    this.authUserMiddleware = new AuthUserMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/users', this.userController.createUser.bind(this.userController));
    this.router.get('/users/',this.authUserMiddleware.authUser.bind(this.authUserMiddleware), this.userController.getUser.bind(this.userController));
    this.router.put('/users', this.authUserMiddleware.authUser.bind(this.authUserMiddleware), this.userController.updateUser.bind(this.userController));
    this.router.delete('/users', this.authUserMiddleware.authUser.bind(this.authUserMiddleware), this.userController.deleteUser.bind(this.userController));
  }
}

export default UserRoutes;
