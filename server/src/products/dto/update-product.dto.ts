import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  barCode?: number | undefined;
  categories?: string | undefined;
  description?: string | undefined;
  purchasePrice?: string | undefined;
  quantity?: string | undefined;
  reference?: string | undefined;
  salePrice?: string | undefined;
  size?: string | undefined;
  supplier?: string | undefined;
}
