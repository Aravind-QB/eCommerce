import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductReviews } from 'src/entities/product-review/product-review.entity';
import { User } from 'src/entities/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(ProductReviews)
    private reviewRepository: Repository<ProductReviews>,
  ) {}

  createOffer(review: ProductReviews): Promise<ProductReviews> {
    try {
      //   console.log(review);
      const newoffer = this.reviewRepository.save(review);
      return newoffer;
    } catch (error) {
      return error;
    }
  }

  findAll(user: User): Promise<ProductReviews[]> {
    return this.reviewRepository.find({
      select: {
        id: true,
        title: true,
        description: true,
        rating: true,
      },
      relations: {
        product: {
          productImages: true,
        },
      },
      where: {
        isActive: true,
        user,
      },
    });
  }

  fetchAllByProduct(pid: string): Promise<ProductReviews[]> {
    return this.reviewRepository.find({
      select: {
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
      relations: {
        user: true,
        // product: {
        //   productImages: true,
        // },
      },
      where: {
        isActive: true,
        product: {
          id: pid,
        },
      },
    });
  }
}
