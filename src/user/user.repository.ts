import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({ where: { id } });
    return user;
  }
}
