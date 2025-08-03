import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, request) {
    const createProductWithOwner = {
      ...createProductDto,
      owner: request.user.username,
    };

    const exists = await this.productsRepository.findOneBy({
      owner: request.user.username,
      barCode: createProductDto.barCode,
    });

    if (exists) {
      throw new ConflictException('Produto já existente!');
    }

    const createdProduct = await this.productsRepository.save(
      createProductWithOwner,
    );

    if (!createdProduct) {
      throw new BadRequestException('Error ao criar produto');
    }

    return createdProduct;
  }

  async findAll(request: any) {
    const products = await this.productsRepository.findBy({
      owner: request.user.username,
    });
    if (!products) {
      throw new BadRequestException('Erro ao buscar produtos!');
    }
    return products;
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Produto não localizado');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productsRepository.update(
      { id: id },
      {
        barCode: updateProductDto.barCode,
        categories: updateProductDto.categories,
        description: updateProductDto.description,
        purchasePrice: updateProductDto.purchasePrice,
        quantity: updateProductDto.quantity,
        reference: updateProductDto.reference,
        salePrice: updateProductDto.salePrice,
        size: updateProductDto.size,
        supplier: updateProductDto.supplier,
      },
    );

    return updateProduct;
  }

  remove(id: number) {
    const product = this.productsRepository.delete({ id });
    return product;
  }
}
