import { ProductOptions } from '@/types/product.types';
import { Product } from '@prisma/client';

export interface IProductService {
  findMany(
    options: ProductOptions,
  ): Promise<{ totalCount: number; list: Product[] }>;
}
