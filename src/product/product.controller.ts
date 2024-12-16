import { Controller, Get, Query } from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ProductOptionsDTO } from '@/types/product.types';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findMany(@Query() query: ProductOptionsDTO) {
    const { totalCount, list } = await this.productService.findMany(query);
    return { totalCount, list };
  }
}
