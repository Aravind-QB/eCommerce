import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Offer } from 'src/entities/offers/offers.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offerService: OffersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Res() response, @Body() offer: Offer) {
    const newCategory = await this.offerService.createOffer(offer);
    if (!!newCategory) {
      return response.status(HttpStatus.CREATED).json({
        success: 'Offer created successfully',
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        failed: 'Offer creation failed',
      });
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Res() response) {
    const offers = await this.offerService.findAll();
    return response.status(HttpStatus.OK).json({
      offers,
    });
  }
}
