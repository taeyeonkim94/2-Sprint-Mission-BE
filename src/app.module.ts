import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ProductModule, JwtModule],
  controllers: [],
  providers: [AuthGuard],
})
export class AppModule {}
