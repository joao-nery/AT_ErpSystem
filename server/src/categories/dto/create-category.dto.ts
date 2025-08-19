import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Precisa ser uma String' })
  @IsNotEmpty({ message: 'Não pode ser vazio' })
  name: string;
}
