import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from '@/types/user.types';
import passwordHashing from '@/utils/passwordHashing';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findUserById(id);
    //TODO. 유저가 없을 경우
    return user;
  }
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findUserByEmail(email);
    //TODO. 유저가 없을경우 에러처리
    return user;
  }

  async createUser(userData: CreateUserDto): Promise<User | null> {
    const { email } = userData;
    const { password } = userData;
    const isUser = await this.userRepository.findUserByEmail(email);
    //if(isUser) 유저가 있을 경우 에러처리
    const hashedPassword = await passwordHashing(password);
    console.log(hashedPassword);
    userData.password = hashedPassword;
    const user = await this.userRepository.createUser(userData);
    return user;
  }
}
