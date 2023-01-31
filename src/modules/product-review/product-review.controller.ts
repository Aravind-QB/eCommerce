import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Request,
  UseGuards,
  Param,
  HttpException,
} from '@nestjs/common';
import { ProductReviews } from 'src/entities/product-review/product-review.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ProductReviewService } from './product-review.service';

@Controller('productreview')
export class ProductReviewController {
  constructor(private readonly reviewService: ProductReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Res() response, @Body() review: ProductReviews) {
    const newreview = await this.reviewService.createOffer(review).catch(err => {
      throw new HttpException({
        message: 'Something went wrong!',
        error: err.message,
      }, HttpStatus.BAD_REQUEST);
    });
    if (!!newreview) {
      return response.status(HttpStatus.CREATED).json({
        success: 'Review created successfully',
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        failed: 'Review creation failed',
      });
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Request() req, @Res() response) {
    const reviews = await this.reviewService.findAll(req.user.user);
    return response.status(HttpStatus.OK).json({
      reviews,
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Get('byproduct/:pid')
  async fetchAllByProduct(@Request() req, @Res() response, @Param('pid') pid) {
    const reviews = await this.reviewService.fetchAllByProduct(pid);
    return response.status(HttpStatus.OK).json({
      reviews,
    });
  }
}
