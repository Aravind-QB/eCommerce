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
        id: true,
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
        categories: {
          category: true
        },
        productImages: true,
        review: true,
      },
      where: {
        isActive: true,
      },
    });
  }

  findOne(id: string): Promise<Product[]> {
    return this.productsRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        inventory: true,
        price: true,
        rating: true,
        thumbnail: true,
        unit: true,
        brand: true,
        discountPercentage: true,
        categories: {
          isActive: true,
          category: {
            id: true,
            name: true,
            description: true
          },
        },
        review: {
          id: true,
          title: true,
          description: true,
          rating: true,
          user: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
      relations: {
        categories: {
          category: true
        },
        productImages: true,
        review: {
          user: true,
        },
      },
      where: {
        id,
        isActive: true,
      },
    });
  }

  findByCategory(id: number): Promise<Product[]> {
    return this.productsRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        inventory: true,
        price: true,
        rating: true,
        thumbnail: true,
        unit: true,
        brand: true,
        discountPercentage: true,
        review: {
          id: true,
          title: true,
          description: true,
          rating: true,
          user: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
      relations: {
        categories: {
          category: true,
        },
        productImages: true,
        review: {
          user: true,
        },
      },
      where: {
        categories: {
          category: {
            id
          },
        },
        isActive: true,
      },
    });
  }

  createProduct(product: Product): Promise<Product> {
    try {
      // console.log(product);
      const newProduct = this.productsRepository.save(product);
      return newProduct;
    } catch (error) {
      return error;
    }
  }
}
