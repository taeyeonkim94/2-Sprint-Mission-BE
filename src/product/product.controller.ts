import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { UploadedFiles, UseInterceptors, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import {
  CreateProductDTO,
  CreateProductWithoutFilesDTO,
  ProductOptionsDTO,
} from '@/types/product.types';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() query: ProductOptionsDTO) {
    const { totalCount, list } = await this.productService.getProducts(query);
    return { totalCount, list };
  }

  @Get(':id')
  async getProductById(@Param() param: { id: string }) {
    const product = await this.productService.getProductById(param.id);
    return product;
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async postProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() request: any,
    @Body() requestData: CreateProductWithoutFilesDTO,
  ) {
    // 파일 처리 로직
    const { user } = request;
    const productData: CreateProductDTO = {
      ...requestData,
      files,
      ownerId: user.id,
    };
    const product = await this.productService.createProduct(productData);
    return product;
  }

  @Delete(':id')
  async deleteProduct(
    @Param() param: { id: string },
    @Req() request: any,
  ): Promise<HttpStatus> {
    const { user } = request;
    const product = await this.productService.deleteProduct(param.id, user.id);
    return HttpStatus.NO_CONTENT;
  }
}
