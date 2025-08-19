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

  async create(createCategoryDto: CreateCategoryDto) {
    const exists = await this.categoriesRepository.findOneBy({
      name: createCategoryDto.name,
    });

    if (exists) {
      throw new ConflictException('Categoria já existente!');
    }

    const created = await this.categoriesRepository.save(createCategoryDto);

    if (!created) {
      throw new InternalServerErrorException('Erro ao cadastrar categoria!');
    }

    return created;
  }

  async findAllWithProductCount(): Promise<Category[]> {
    return this.categoriesRepository
      .createQueryBuilder('category') // 'category' é um alias para a tabela Category
      .loadRelationCountAndMap('category.quantity', 'category.products') // Mágica acontece aqui!
      .getMany();
  }

  // Exemplo para buscar uma única categoria com a contagem
  async findOneWithProductCount(id: string): Promise<any> {
    return this.categoriesRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .loadRelationCountAndMap('category.quantity', 'category.products')
      .getOne();
  }

  async findAll() {
    const categories = await this.categoriesRepository.find();

    if (!categories) {
      throw new BadGatewayException('Erro ao buscar as categorias');
    }

    return categories;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
