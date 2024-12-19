import { Injectable } from '@nestjs/common';
import { IProductService } from './product.service.interface';
import { ProductRepository } from './product.repository';
import { CreateProductDTO, ProductOptions } from '@/types/product.types';
import { Product } from '@prisma/client';
import ErrorMessage from '@/common/enums/error.message.enums';
import { ForbiddenError, NotFoundError } from '@/common/errors/CustomError';
import { S3Service } from '@/s3/s3.service';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly s3Service: S3Service,
  ) {}

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
    const { files, ownerId, ...restProductData } = productData;
    const uploadPromises = files.map((file) => {
      const s3key = `${ownerId}/${file.originalname}`;
      return this.s3Service.uploadPublicFile(file.buffer, s3key);
    });

    const filesPath = await Promise.all(uploadPromises);

    const storedProductData = {
      ...restProductData,
      ownerId,
      images: filesPath,
    };

    const product = await this.productRepository.create(storedProductData);
    const filterImagePromise = product.images.map(
      async (s3key) => await this.s3Service.generatePresignedUrl(s3key),
    );
    const responseImages = await Promise.all(filterImagePromise);
    product.images = responseImages;
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
