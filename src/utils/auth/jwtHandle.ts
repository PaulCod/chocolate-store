import jwt, { SignOptions } from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'

class JwtHandler {
  static generateToken(userId: string, email: string): string {
    const privateKey = fs.readFileSync(path.join(__dirname, '../../../private.pem'), 'utf8')

    const payload = {userId, email}
    const signOptions: SignOptions = {
      algorithm: 'RS256',
      expiresIn: '24h'
    };
    const token = jwt.sign(payload, privateKey, signOptions)
    return token
  }

  static validateToken(token: string): boolean {
    return true;
  }
}

export default JwtHandler 