import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'A descricao precisa ser uma string' })
  @IsNotEmpty({ message: 'A descricao nao pode ser vazio' })
  description: string;

  @IsString({ message: 'O valor do codigo de barras precisa ser uma string' })
  @IsNotEmpty({ message: 'o codigo de barras nao pode ser vazio' })
  barCode: number;

  @IsString({ message: 'O valor da referencia precisa ser uma string' })
  @IsNotEmpty({ message: 'O valor da referencia Nao pode ser vazio' })
  reference: string;

  @IsString({ message: 'O fornecedor precisa ser uma string' })
  @IsNotEmpty({ message: 'O fornecedor nao pode ser vazio' })
  supplier: string;

  @IsString({ message: 'O tamanho precisa ser uma string' })
  @IsNotEmpty({ message: 'O tamanho nao pode ser vazio' })
  size: string;

  @IsString({ message: 'As categorias precisa ser uma string' })
  @IsNotEmpty({ message: 'As categorias nao pode ser vazio' })
  categories: string;

  @IsString({ message: 'A quantidade precisa ser uma string' })
  @IsNotEmpty({ message: 'A quantidade nao pode ser vazio' })
  quantity: string;

  @IsString({ message: 'O preco de venda precisa ser uma string' })
  @IsNotEmpty({ message: 'O preco de venda nao pode ser vazio' })
  salePrice: string;

  @IsString({ message: 'O preco de compra precisa ser uma string' })
  @IsNotEmpty({ message: 'O preco de compra nao pode ser vazio' })
  purchasePrice: string;
}
