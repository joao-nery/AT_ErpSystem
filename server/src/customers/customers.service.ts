import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto, request) {
    const createCustomerWithOwner = {
      ...createCustomerDto,
      owner: request.user.username,
    };

    const exists = await this.customersRepository.findOneBy({
      owner: request.user.username,
      email: createCustomerDto.email,
    });

    if (exists) {
      throw new ConflictException('Produto já existente!');
    }

    const createdProduct = await this.customersRepository.save(
      createCustomerWithOwner,
    );

    if (!createdProduct) {
      throw new BadRequestException('Error ao criar produto');
    }

    return createdProduct;
  }

  async findAll(request: any) {
    const customers = await this.customersRepository.findBy({
      owner: request.user.username,
    });

    if (!customers) {
      throw new BadRequestException('Erro ao buscar produtos!');
    }
    return customers;
  }

  async findOne(id: string) {
    const product = await this.customersRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Produto não localizado');
    }

    return product;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const updateProduct = await this.customersRepository.update(
      { id: id },
      {
        name: updateCustomerDto.name,
        email: updateCustomerDto.email,
        phone: updateCustomerDto.phone,
        notes: updateCustomerDto.notes,
      },
    );

    return updateProduct;
  }

  remove(id: string) {
    const product = this.customersRepository.delete({ id });
    return product;
  }
}
