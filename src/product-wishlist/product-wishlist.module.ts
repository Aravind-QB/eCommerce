import { Module } from '@nestjs/common';
import { ProductWishlistService } from './product-wishlist.service';
import { ProductWishlistController } from './product-wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductWishlist } from 'src/entities/products/productWishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductWishlist])],
  providers: [ProductWishlistService],
  controllers: [ProductWishlistController]
})
export class ProductWishlistModule {}
