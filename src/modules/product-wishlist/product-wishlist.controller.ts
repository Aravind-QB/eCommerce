import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UseGuards, Request } from '@nestjs/common';
import { ProductWishlist } from 'src/entities/products/productWishlist.entity';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { ProductWishlistService } from './product-wishlist.service';

@Controller('productwishlist')
export class ProductWishlistController {

  constructor(private readonly wishlistService: ProductWishlistService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Res() response, @Body() review: ProductWishlist) {
    const newreview = await this.wishlistService.createOffer(review).catch(err => {
      throw new HttpException({
        message: 'Something went wrong!',
        error: err.message,
      }, HttpStatus.BAD_REQUEST);
    });
    if (!!newreview) {
      return response.status(HttpStatus.CREATED).json({
        success: 'Product added to wishlist successfully',
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        failed: 'Wishlist update failed',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Request() req, @Res() response) {
    const wishlist = await this.wishlistService.findAll(req.user.user);
    return response.status(HttpStatus.OK).json({
        wishlist,
    });
  }

}
