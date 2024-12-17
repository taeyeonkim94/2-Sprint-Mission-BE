import { CreateProductDTO, ProductOptions } from '@/types/product.types';
import { Product } from '@prisma/client';

export interface IProductService {
  getProducts(
    options: ProductOptions,
  ): Promise<{ totalCount: number; list: Product[] }>;
  getProductById(id: string): Promise<Product>;
  createProduct(productData: CreateProductDTO): Promise<Product>;
  deleteProduct(id: string, userId: string): Promise<Product>;
}
