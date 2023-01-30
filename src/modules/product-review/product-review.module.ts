import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReviews } from 'src/entities/product-review/product-review.entity';
import { ProductReviewController } from './product-review.controller';
import { ProductReviewService } from './product-review.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReviews])],
  controllers: [ProductReviewController],
  providers: [ProductReviewService],
})
export class ProductReviewModule {}
