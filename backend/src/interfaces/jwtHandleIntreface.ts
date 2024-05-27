interface IJwtHandler {
  generateToken(idUser: string): string
  validateToken(token: string): boolean
}

export {IJwtHandler}