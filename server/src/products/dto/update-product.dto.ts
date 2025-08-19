import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  name?: string | undefined;
  quantity?: string | undefined;
  salePrice?: string | undefined;
  categoryId?: string | undefined;
}
