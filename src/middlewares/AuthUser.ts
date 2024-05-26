import {Request, Response, NextFunction } from "express"
import JwtHandler from "../utils/auth/jwtHandle"

class AuthUserMiddleware {

  async authUser(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if(!authorization) {
      return res.status(401).json({
        message: ["Unauthorized"]
      })
    }

    const token = authorization.split(" ")[1]

    if(!token) {
      console.log("Aqui")
      return res.status(401).json({
        message: ["Invalid token"]
      })
    }

    const result = JwtHandler.verifyToken(token)

    if (typeof result === "boolean" && !result) {
      return res.status(401).json({
        message: ["Unauthorized"]
      })
    }

    if(typeof result === "object" && result != null && "userId" in result) {
      req.body = req.body || {}
      req.body.userId = result.userId as string
    } else {
      return res.status(401).json({
        message: ["Unauthorized"]
      })
    }

    next()
  }
}

export default AuthUserMiddleware