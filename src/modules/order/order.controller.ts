import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  Request,
  Req,
  HttpException,
} from '@nestjs/common';
import { Order } from '../../entities/order/order.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Request() req, @Res() response, @Body() order: Order) {
    const newOrder = await this.orderService.createOrder(order).catch(err => {
      throw new HttpException({
        message: 'Something went wrong!',
        error: err.message,
      }, HttpStatus.BAD_REQUEST);
    });
    if (!!newOrder) {
      return response.status(HttpStatus.CREATED).json({
        orderid: newOrder.id,
        success: 'Order created/updated successfully',
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        failed: 'Order creation/updation failed',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const order = await this.orderService.findOne(id);
    if (!!order) {
      return response.status(HttpStatus.OK).json({
        order,
      });
    } else {
      return response.status(HttpStatus.NOT_FOUND).json({});
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('getby/user')
  async findByUser(@Req() req, @Res() response) {
    const user = req?.user?.payload?.user;
    const order = await this.orderService.findByUser(user);
    if (!!order) {
      return response.status(HttpStatus.OK).json({
        order,
      });
    } else {
      return response.status(HttpStatus.NOT_FOUND).json({});
    }
  }
}
