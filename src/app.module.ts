import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
