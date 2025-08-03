import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'O valor precisa ser uma string' })
  @IsNotEmpty({ message: 'Não pode ser vazio' })
  @IsEmail()
  email: string;

  @IsString({ message: 'O valor precisa ser uma string' })
  @IsNotEmpty({ message: 'Não pode ser vazio' })
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres!' })
  password: string;
}
