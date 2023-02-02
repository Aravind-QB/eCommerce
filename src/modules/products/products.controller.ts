import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Product } from '../../entities/products/products.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Res() response, @Body() product: Product) {
    const newProduct = await this.productsService.createProduct(product).catch(err => {
      throw new HttpException({
        message: 'Something went wrong!',
        error: err.message,
      }, HttpStatus.BAD_REQUEST);
    });;
    if (!!newProduct) {
      return response.status(HttpStatus.CREATED).json({
        success: 'Product created successfully',
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        failed: 'Product creation failed',
      });
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Res() response) {
    const products = await this.productsService.findAll();

    products.forEach(prd => {
      let categoryList = [];
      prd.categories.forEach(cat => {
        categoryList.push({id: cat.category.id, name: cat.category.name, description: cat.category.description});
      });
      prd.categories = categoryList;
    });

    return response.status(HttpStatus.OK).json({
      products,
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const product = await this.productsService.findOne(id);

    if (!!product) {
      
      product.forEach(prd => {
        let categoryList = [];
        prd.categories.forEach(cat => {
          categoryList.push({id: cat.category.id, name: cat.category.name, description: cat.category.description});
        });
        prd.categories = categoryList;
      });
      
      return response.status(HttpStatus.OK).json({
        product,
      });
    } else {
      return response.status(HttpStatus.NOT_FOUND).json({});
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get('byCategory/:id')
  async findByCategory(@Res() response, @Param('id') id) {
    const product = await this.productsService.findByCategory(id);
    if (!!product) {

      product.forEach(prd => {
        let categoryList = [];
        prd.categories.forEach(cat => {
          categoryList.push({id: cat.category.id, name: cat.category.name, description: cat.category.description});
        });
        prd.categories = categoryList;
      });

      return response.status(HttpStatus.OK).json({
        product,
      });
    } else {
      return response.status(HttpStatus.NOT_FOUND).json({});
    }
  }
}
