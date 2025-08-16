import {
  Controller,
  Post,
  Body,
  Req,
  InternalServerErrorException,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Req() request: Request,
  ) {
    const customer = await this.customersService.create(
      createCustomerDto,
      request,
    );

    if (!customer) {
      throw new InternalServerErrorException('Erro interno');
    }

    return {
      message: 'Cliente criado com sucesso',
      statusCode: 201,
    };
  }

  @Get()
  async findAll(@Req() request: Request) {
    const customers = await this.customersService.findAll(request);
    return {
      message: 'Clientes encontrados com sucesso',
      statusCode: 200,
      data: customers,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.customersService.findOne(id);
    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateCustomerDto,
  ) {
    const product = await this.customersService.update(id, updateProductDto);

    if (!product) {
      throw new InternalServerErrorException('Erro ao atualizar o produto');
    }

    return { message: 'Produto atualizado com sucesso!', statusCode: 200 };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
