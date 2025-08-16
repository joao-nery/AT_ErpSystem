import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuards } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const created = await this.usersService.create(createUserDto);

    if (!created) {
      throw new BadRequestException('Erro ao Criar Usuário!');
    }

    const response: ResponseUserDto = {
      name: created.name,
      email: created.email,
      createdAt: created.createAt,
      updateAt: created.updateAt,
    };

    const jsonReponse = JSON.stringify(response);

    return {
      message: 'Usuário criado com sucesso!',
      statusCode: 201,
      user: jsonReponse,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuards)
  @Roles('admin')
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    if (!users) {
      throw new NotFoundException('Não foi possivel encontrar usuários!');
    }

    const responseDto = users.map((user) => {
      let newObject = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createAt: user.createAt,
        updateAt: user.updateAt,
      };
      return newObject;
    });

    return { message: 'Lista de usuários cadastrados:', users: responseDto };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOneByID(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    const response: ResponseUserDto = {
      name: user.name,
      email: user.email,
      createdAt: user.createAt,
      updateAt: user.updateAt,
      role: user.role,
    };

    return response;
  }

  @Patch('updatePassword')
  async updatePassword(@Body() UpdateUserDto: UpdateUserDto) {
    const user = await this.usersService.updatePassword(UpdateUserDto);
    if (!user) {
      throw new InternalServerErrorException('Erro ao atualizar a senha!');
    }

    return { message: 'Senha atualizada com sucesso!', statusCode: 200 };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const created = await this.usersService.update(id, updateUserDto);

    if (!created) {
      throw new InternalServerErrorException('Erro no server');
    }

    return { message: 'Usuário atualizado Com sucesso!', statusCode: 203 };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.usersService.remove(id);

    if (!removed) {
      throw new InternalServerErrorException('Erro no server');
    }

    return { message: 'Usuário' + id + 'removido com sucesso' };
  }
}
