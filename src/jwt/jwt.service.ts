import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret = '123123';
  private readonly refreshSecret = '1231234';

  generateAccessToken(userId: string) {
    const payload = { id: userId };
    const accessToken = jwt.sign(payload, this.secret, {
      expiresIn: '15m',
    });
    return accessToken;
  }

  generateRefreshToken(userId: string) {
    const payload = { id: userId };
    const refreshToken = jwt.sign(payload, this.secret, { expiresIn: '7d' });
    return refreshToken;
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return null; // 유효하지 않은 토큰일 경우 null 반환
    }
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, this.refreshSecret);
    } catch (error) {
      return null; // 유효하지 않은 리프레시 토큰일 경우 null 반환
    }
  }
}
