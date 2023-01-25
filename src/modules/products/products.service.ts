import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/products/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      select: {
        name: true,
        description: true,
        inventory: true,
        price: true,
        rating: true,
        thumbnail: true,
        unit: true,
        brand: true,
        discountPercentage: true,
      },
      relations: {
        category: true,
        productImages: true,
      },
      where: {
        isActive: true,
      },
    });
  }

  findOne(id: string): Promise<Product[]> {
    return this.productsRepository.find({
      select: {
        name: true,
        description: true,
        inventory: true,
        price: true,
        rating: true,
        thumbnail: true,
        unit: true,
        brand: true,
        discountPercentage: true,
      },
      relations: {
        category: true,
        productImages: true,
      },
      where: {
        id,
        isActive: true,
      },
    });
  }

  createProduct(product: Product): Promise<Product> {
    try {
      console.log(product);
      const newProduct = this.productsRepository.save(product);
      return newProduct;
    } catch (error) {
      return error;
    }
  }
}
