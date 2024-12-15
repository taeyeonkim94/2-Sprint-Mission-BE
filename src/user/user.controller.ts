import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User | null> {
    const user = this.userService.findUserById(id);
    return user;
  }
}
