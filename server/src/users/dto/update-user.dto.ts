import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({ message: 'O valor precisa ser uma string' })
  @IsNotEmpty({ message: 'Não pode ser vazio' })
  @IsEmail({}, { message: 'Precisa ser um e-mail válido' })
  email?: string;

  @IsString({ message: 'O valor precisa ser uma string' })
  @IsNotEmpty({ message: 'Não pode ser vazio' })
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres!' })
  password?: string;
}
