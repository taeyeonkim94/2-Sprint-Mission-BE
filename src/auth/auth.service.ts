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
    //TODO if(!user) 에러처리
    const isSuccess = await bcrypt.compare(userData.password, user.password);
    //TODO. 비밀번호가 맞지 않는 경우 에러처리 if(!isSuccess)

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const responseUserData = filterUserInfo(user, accessToken, refreshToken);
    return responseUserData;
  }
}
