import {
  Body,
  Controller,
  Get,
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
    const newProduct = await this.productsService.createProduct(product);
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Res() response) {
    const products = await this.productsService.findAll();
    return response.status(HttpStatus.OK).json({
      products,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const product = await this.productsService.findOne(id);
    if (!!product) {
      return response.status(HttpStatus.OK).json({
        product,
      });
    } else {
      return response.status(HttpStatus.NOT_FOUND).json({});
    }
  }
}
