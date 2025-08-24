import {
  BadGatewayException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, request) {
    const { name } = createCategoryDto;

    const exists = await this.categoriesRepository.findOneBy({
      name: createCategoryDto.name,
      owner: request.user.username,
    });

    if (exists) {
      throw new ConflictException('Categoria já existente!');
    }

    const category = this.categoriesRepository.create({
      name,
      owner: request.user.username,
    });

    const created = await this.categoriesRepository.save(category);

    if (!created) {
      throw new InternalServerErrorException('Erro ao cadastrar categoria!');
    }

    return created;
  }

  async findAll(request) {
    const categories = await this.categoriesRepository.find({
      where: { owner: request.user.username },
    });

    if (!categories) {
      throw new BadGatewayException('Erro ao buscar as categorias');
    }

    return categories;
  }

  async findOne(id: string, request) {
    const category = await this.categoriesRepository.findOneBy({
      id: id,
      owner: request.user.username,
    });

    if (!category) {
      throw new InternalServerErrorException('Erro ao buscar categoria');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: CreateCategoryDto) {
    const updated = await this.categoriesRepository.update(
      { id: id },
      { name: updateCategoryDto.name },
    );

    if (!updated) {
      throw new Error('Erro ao atualizar categoria!');
    }

    return updated;
  }

  remove(id: string) {
    const product = this.categoriesRepository.delete({ id });
    return product;
  }
}
