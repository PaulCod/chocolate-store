import { Router } from "express";
import { ILoginController } from "../interfaces/LoginInterface";

class LoginRoutes {
  router: Router
  loginController: ILoginController

  constructor(loginController: ILoginController) {
    this.router = Router()
    this.loginController = loginController
    this.initializeRoutes()
  }
  initializeRoutes() {
    this.router.post('/login', this.loginController.login.bind(this.loginController));
  }
}

export default LoginRoutes