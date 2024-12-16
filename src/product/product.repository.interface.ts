import { ProductOptions } from '@/types/product.types';
import { Product } from '@prisma/client';

export interface IProductRepository {
  findMany(options: ProductOptions): Promise<Product[]>;
  totalCount(option: ProductOptions): Promise<number>;
}
