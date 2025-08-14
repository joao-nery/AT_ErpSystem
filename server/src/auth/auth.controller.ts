import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersServices: UsersService,
  ) {}

  @Post('login')
  async doLogin(@Body() loginDto: LoginDto) {
    return await this.authService.doLogin(loginDto);
  }

  @Get('token')
  async getUserForToken(@Req() request: Request) {
    const { authorization } = request.headers;
    const userToken = this.jwtService.decode(authorization as string);
    const user = await this.usersServices.findOneByID(userToken.sub);

    return user;
  }
}
