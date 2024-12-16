import { Injectable } from '@nestjs/common';
import { IProductService } from './product.service.interface';
import { ProductRepository } from './product.repository';
import { ProductOptions } from '@/types/product.types';
import { Product } from '@prisma/client';
import ErrorMessage from '@/common/enums/error.message.enums';
import { NotFoundError } from '@/common/errors/CustomError';

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

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundError(ErrorMessage.PRODUCT_NOT_FOUND);
    return product;
  }
}
