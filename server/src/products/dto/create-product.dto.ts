import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'O nome precisa ser uma string' })
  @IsNotEmpty({ message: 'O nome nao pode ser vazio' })
  name: string;

  @IsString({ message: 'A quantidade precisa ser uma string' })
  @IsNotEmpty({ message: 'A quantidade nao pode ser vazio' })
  quantity: string;

  @IsString({ message: 'A quantidade precisa ser uma string' })
  @IsNotEmpty({ message: 'A quantidade nao pode ser vazio' })
  categoryId: string;

  @IsString({ message: 'O preco de venda precisa ser uma string' })
  @IsNotEmpty({ message: 'O preco de venda nao pode ser vazio' })
  salePrice: string;
}
