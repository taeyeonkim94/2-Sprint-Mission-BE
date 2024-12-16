import ErrorMessage from '@/common/enums/error.message.enums';
import { UnauthorizedError } from '@/common/errors/CustomError';
import { AuthDto } from '@/types/auth.types';
import { UserRepository } from '@/user/user.repository';
import filterUserInfo from '@/utils/filterUserInfo';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@/utils/generateToken';
import passwordHashing from '@/utils/passwordHashing';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = '123123';

  constructor(private readonly userRepository: UserRepository) {}

  async login(userData: AuthDto) {
    const user = await this.userRepository.findUserByEmail(userData.email);

    if (!user) throw new UnauthorizedError(ErrorMessage.USER_UNAUTHORIZED_ID);
    const isSuccess = await bcrypt.compare(userData.password, user.password);
    if (!isSuccess)
      throw new UnauthorizedError(ErrorMessage.USER_UNAUTHORIZED_PW);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const responseUserData = filterUserInfo(user, accessToken, refreshToken);
    return responseUserData;
  }
}
