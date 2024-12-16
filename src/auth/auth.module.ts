import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from '@/user/user.repository';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@/jwt/jwt.module';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [],
})
export class AuthModule {}
