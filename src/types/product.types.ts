import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

export enum ProductsOrderBy {
  recent = 'recent',
  favorite = 'favorite',
}

export class ProductOptionsDTO {
  @Type(() => Number)
  @IsInt()
  page: number = 0;

  @Type(() => Number)
  @IsInt()
  pageSize: number = 10;

  @IsEnum(ProductsOrderBy)
  orderBy: ProductsOrderBy = ProductsOrderBy.recent;

  @IsOptional()
  keyword?: string;
}

export class ProductOptions {
  page: number;
  pageSize: number;
  orderBy: ProductsOrderBy;
  keyword?: string;
}
