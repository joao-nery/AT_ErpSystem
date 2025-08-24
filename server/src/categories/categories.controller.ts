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
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@UseGuards(AuthGuard('jwt'))
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() request) {
    const result = await this.categoriesService.create(
      createCategoryDto,
      request,
    );

    return {
      message: 'Categoria criada com sucesso',
      statusCode: 201,
      data: result,
    };
  }

  @Get()
  async findAll(@Req() request: any) {
    const categories = await this.categoriesService.findAll(request);

    return { message: 'Categorias', statusCode: 200, categories: categories };
  }

  @Get(':id')
  async findOne(@Param(':id') id: string, @Req() request: any) {
    const result = await this.categoriesService.findOne(id, request);

    return result;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateCategoryDto,
  ) {
    const category = await this.categoriesService.update(id, updateProductDto);

    return {
      message: 'Produto atualizado com sucesso!',
      statusCode: 200,
      category: category,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
