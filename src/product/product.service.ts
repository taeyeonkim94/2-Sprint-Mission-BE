import { Injectable } from '@nestjs/common';
import { IProductService } from './product.service.interface';
import { ProductRepository } from './product.repository';
import { ProductOptions } from '@/types/product.types';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async findMany(
    options: ProductOptions,
  ): Promise<{ totalCount: number; list: Product[] }> {
    const [totalCount, list] = await Promise.all([
      this.productRepository.totalCount(options),
      this.productRepository.findMany(options),
    ]);

    return { totalCount, list };
  }
}
