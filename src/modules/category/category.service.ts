import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from '../../entities/products/categories.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}

  createCategory(category: Categories): Promise<Categories> {
    try {
      const newcategory = this.categoryRepository.save(category);
      return newcategory;
    } catch (error) {
      return error;
    }
  }

  findAll(): Promise<Categories[]> {
    return this.categoryRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
      },
      where: {
        isActive: true,
      },
    });
  }
}
