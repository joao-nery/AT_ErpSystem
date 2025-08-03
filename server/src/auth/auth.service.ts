import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async doLogin(logindto: LoginDto) {
    // validando e-mail...
    const user = await this.usersService.findOneByEmail(logindto.email);

    if (!user) {
      throw new UnauthorizedException(
        'Credenciais invalidas ou Usuário Inexistente',
      );
    }

    // validando senha...
    const hashedPassword = bcrypt.compareSync(
      logindto.password,
      user?.password as string,
    );

    if (!hashedPassword) {
      throw new UnauthorizedException('Credenciais invalidas');
    }

    // assinando o jwt e retornando o token
    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        username: user.name,
      }),
    };
  }
}
