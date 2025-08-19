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
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Criar Produto
  async create(createProductDto: CreateProductDto, request) {
    const { name, quantity, salePrice } = createProductDto;

    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    const product = this.productsRepository.create({
      name,
      quantity,
      salePrice,
      owner: request.user.username,
      category: category,
    });

    const exists = await this.productsRepository.findOneBy({
      owner: request.user.username,
      name: createProductDto.name,
    });

    if (exists) {
      throw new ConflictException('Produto já existente!');
    }

    const createdProduct = await this.productsRepository.save(product);

    if (!createdProduct) {
      throw new BadRequestException('Error ao criar produto');
    }

    return createdProduct;
  }

  // Buscar todos
  async findAll(request: any) {
    const products = await this.productsRepository.find({
      where: {
        owner: request.user.username,
      },
      relations: ['category'],
    });

    products.map((item, index) => console.log(item));

    if (!products) {
      throw new BadRequestException('Erro ao buscar produtos!');
    }
    return products;
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Produto não localizado');
    }

    return product;
  }

  // Atualizar Produtos
  async update(id: string, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productsRepository.update(
      { id: id },
      {
        name: updateProductDto.name,
        quantity: updateProductDto.quantity,
        salePrice: updateProductDto.salePrice,
      },
    );

    return updateProduct;
  }

  // Remover Produtos
  remove(id: string) {
    const product = this.productsRepository.delete({ id });
    return product;
  }
}
