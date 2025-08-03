import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Se já existir o usuário retornar um erro
    const userExistis = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (userExistis) {
      throw new ConflictException('Usuário já existente!');
    }

    // criptografar senha do usuário
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    if (!hashedPassword) {
      throw new InternalServerErrorException('Erro no Servidor!');
    }

    // alterando o objeto original para colocar o hash
    createUserDto = {
      ...createUserDto,
      password: hashedPassword,
    };

    return await this.usersRepository.save(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOneByID(id: string) {
    const user = await this.usersRepository.findOneByOrFail({ id });

    return user;
  }

  async findOneByEmail(email) {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneByOrFail({ id });

    const newHashedPassword = bcrypt.hashSync(
      updateUserDto.password as string,
      10,
    );

    const newUser = {
      ...user,
      email: updateUserDto.email,
      password: newHashedPassword,
    };
    console.log(newUser);

    return this.usersRepository.save(newUser);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.usersRepository.remove(user);
  }
}
