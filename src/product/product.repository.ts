import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IProductRepository } from './product.repository.interface';
import {
  CreateProductDTO,
  ProductOptions,
  ProductsOrderBy,
} from '@/types/product.types';
import { Product } from '@prisma/client';
import { contains } from 'class-validator';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(options: ProductOptions): Promise<Product[]> {
    const { page, pageSize, orderBy, keyword } = options;

    const orderByField: { createdAt: 'desc' } | { favoriteCount: 'desc' } =
      orderBy === ProductsOrderBy.recent
        ? { createdAt: 'desc' }
        : { favoriteCount: 'desc' };

    const products = await this.prisma.product.findMany({
      where: keyword ? { title: { contains: keyword } } : {},
      take: pageSize,
      skip: pageSize * page,
      orderBy: orderByField,
    });
    return products;
  }

  async totalCount(options: ProductOptions): Promise<number> {
    const { keyword } = options;
    const totalCount = await this.prisma.product.count({
      where: keyword ? { title: { contains: keyword } } : {},
    });
    return totalCount;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { productFavorites: true },
    });
    return product;
  }

  async create(productData: CreateProductDTO) {
    const { title, description, price, images, tags, ownerId } = productData;

    const product = await this.prisma.product.create({
      data: {
        title,
        description,
        price,
        images,
        tags,
        owner: { connect: { id: ownerId } },
      },
    });
    return product;
  }
}
