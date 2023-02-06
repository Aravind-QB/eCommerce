import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Addresses } from 'src/entities/users/user-addresses';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAddress(@Res() response, @Body() address: Addresses) {
    const newAddress = await this.addressService.createAddress(address).catch(err => {
      throw new HttpException({
        message: 'Something went wrong!',
        error: err.message,
      }, HttpStatus.BAD_REQUEST);
    });
    if (!!newAddress) {
      return response.status(HttpStatus.CREATED).json({
        success: 'Address created successfully',
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        failed: 'Address creation failed',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Req() request, @Res() response) {
    const user= request.user.user;
    const categories = await this.addressService.findAll(user);
    return response.status(HttpStatus.OK).json({
      categories,
    });
  }
}
