import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Categories } from '../../entities/products/categories.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Res() response, @Body() category: Categories) {
    const newCategory = await this.categoryService.createCategory(category);
    if (!!newCategory) {
      return response.status(HttpStatus.CREATED).json({
        success: 'Product Category created successfully',
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        failed: 'Product Category creation failed',
      });
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Res() response) {
    const categories = await this.categoryService.findAll();
    return response.status(HttpStatus.OK).json({
      categories,
    });
  }
}
