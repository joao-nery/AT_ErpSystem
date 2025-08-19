import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() request: Request,
  ) {
    const created = await this.productsService.create(
      createProductDto,
      request,
    );

    if (!created) {
      throw new InternalServerErrorException('Erro no Servidor!');
    }

    return { message: 'Produto criado com sucesso!', statusCode: 201 };
  }

  @Get()
  async findAll(@Req() request: Request) {
    const products = await this.productsService.findAll(request);

    return products;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(id, updateProductDto);

    if (!product) {
      throw new InternalServerErrorException('Erro ao atualizar o produto');
    }

    return { message: 'Produto atualizado com sucesso!', statusCode: 200 };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
