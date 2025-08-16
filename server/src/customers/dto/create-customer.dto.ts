import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres' })
  name: string;

  @IsString({ message: 'O telefone deve ser uma string' })
  @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
  @MinLength(10, { message: 'O telefone deve ter pelo menos 10 caracteres' })
  phone: string;

  @IsString({ message: 'O e-mail deve ser uma string' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio' })
  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  email: string;

  @IsString({ message: 'As notas devem ser uma string' })
  @IsNotEmpty({ message: 'As notas não podem ser vazias' })
  @MinLength(10, { message: 'As notas devem ter pelo menos 10 caracteres' })
  notes: string;
}
