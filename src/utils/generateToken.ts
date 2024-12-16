import { AuthDto } from '@/types/auth.types';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

export function generateAccessToken(user: User) {
  const payload = { id: user.id, email: user.email };
  const secretKey = 'your_access_token_secret';
  const options = { expiresIn: '15m' }; // 액세스 토큰 만료 시간
  return jwt.sign(payload, secretKey, options);
}

export function generateRefreshToken(user: User) {
  const payload = { id: user.id, email: user.email };
  const secretKey = 'your_access_token_secret';
  const options = { expiresIn: '7d' }; // 액세스 토큰 만료 시간
  return jwt.sign(payload, secretKey, options);
}
