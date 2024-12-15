import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(id: string): Promise<User | null> {
    const user = this.userRepository.findUserById(id);
    //TODO. 유저가 없을 경우
    return user;
  }
}
