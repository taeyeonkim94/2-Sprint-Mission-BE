import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import GlobalExceptionFilter from './common/filters/GlobalExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from './jwt/jwt.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalGuards(new AuthGuard(new JwtService()))
    .useGlobalPipes(new ValidationPipe({ transform: true }))
    .useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
