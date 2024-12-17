import { Injectable } from '@nestjs/common';
import { IProductService } from './product.service.interface';
import { ProductRepository } from './product.repository';
import { CreateProductDTO, ProductOptions } from '@/types/product.types';
import { Product } from '@prisma/client';
import ErrorMessage from '@/common/enums/error.message.enums';
import { ForbiddenError, NotFoundError } from '@/common/errors/CustomError';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(
    options: ProductOptions,
  ): Promise<{ totalCount: number; list: Product[] }> {
    const [totalCount, list] = await Promise.all([
      this.productRepository.totalCount(options),
      this.productRepository.findMany(options),
    ]);

    return { totalCount, list };
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundError(ErrorMessage.PRODUCT_NOT_FOUND);
    return product;
  }

  async createProduct(productData: CreateProductDTO): Promise<Product> {
    const { files, ...restProductData } = productData;
    const filesPath = files.map((file, index) => {
      return String(index);
    }); //TODO. S3이미지경로 추가

    const storedProductData = {
      ...restProductData,
      images: filesPath,
    };

    const product = await this.productRepository.create(storedProductData);
    //TODO. 반환할 때는 이미지로 변경
    return product;
  }

  async deleteProduct(id: string, userId: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundError(ErrorMessage.PRODUCT_NOT_FOUND);

    if (product.ownerId !== userId) {
      throw new ForbiddenError(ErrorMessage.PRODUCT_FORBIDDEN);
    }

    const deletedProduct = await this.productRepository.delete(id);
    return product;
  }
}
