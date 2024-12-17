import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UploadModule } from '@/upload/upload.module';

@Module({
  imports: [PrismaModule, UploadModule],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
  exports: [],
})
export class ProductModule {}
