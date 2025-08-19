import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
@UseGuards(AuthGuard('jwt'))
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const result = await this.categoriesService.create(createCategoryDto);

    return {
      message: 'Categoria criada com sucesso',
      statusCode: 201,
      data: result,
    };
  }

  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();

    return { message: 'Categorias', statusCode: 200, categories: categories };
  }

  @Get('')
  async findOneWithProductCount(@Param(':id') id: string) {
    return await this.categoriesService.findOneWithProductCount(id);
  }

  @Get('categoriesQuantity')
  async findAllWithProductCount() {
    return await this.categoriesService.findAllWithProductCount();
  }
}
