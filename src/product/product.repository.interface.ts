import { CreateProductDTO, ProductOptions } from '@/types/product.types';
import { Product } from '@prisma/client';

export interface IProductRepository {
  findMany(options: ProductOptions): Promise<Product[]>;
  totalCount(option: ProductOptions): Promise<number>;
  findById(id: string): Promise<Product | null>;
  create(productData: CreateProductDTO): Promise<Product>;
  delete(id: string): Promise<Product>;
}
