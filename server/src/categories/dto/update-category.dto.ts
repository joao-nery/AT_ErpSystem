import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString({ message: 'Precisa ser uma String' })
  @IsNotEmpty({ message: 'Não pode ser vazio' })
  name: string;
}
