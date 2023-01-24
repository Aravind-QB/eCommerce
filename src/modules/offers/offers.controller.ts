import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offerService: OffersService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Res() response) {
    const offers = await this.offerService.findAll();
    return response.status(HttpStatus.OK).json({
      offers,
    });
  }
}
