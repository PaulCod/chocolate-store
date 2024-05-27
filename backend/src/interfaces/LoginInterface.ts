import { Request, Response } from "express"

interface ILoginData {
  email: string
  password: string
}

interface ILoginController {
  login(req: Request, res: Response): void
}

export { ILoginData, ILoginController }