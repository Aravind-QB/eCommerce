import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductWishlist } from 'src/entities/products/productWishlist.entity';
import { User } from 'src/entities/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductWishlistService {
    constructor(
        @InjectRepository(ProductWishlist)
        private wishlistRepository: Repository<ProductWishlist>,
      ) {}
    
      createOffer(wishlist: ProductWishlist): Promise<ProductWishlist> {
        try {
          //   console.log(review);
          const newoffer = this.wishlistRepository.save(wishlist);
          return newoffer;
        } catch (error) {
          return error;
        }
      }
    
      findAll(user: User): Promise<ProductWishlist[]> {
        return this.wishlistRepository.find({
          select: {
            id: true,
          },
          relations: {
            product: true,
          },
          where: {
            isActive: true,
            user,
          },
        });
      }
}
