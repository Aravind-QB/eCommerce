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
    const newOrder = await this.orderService.createOrder(order);
    if (!!newOrder) {
      return response.status(HttpStatus.CREATED).json({
        success: 'Order created successfully',
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        failed: 'Order creation failed',
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
        // firstname: order.firstName,
        // lastname: order.lastName,
        // email: order.email,
        // phonenumber: order.phoneNumber,
      });
    } else {
      return response.status(HttpStatus.NOT_FOUND).json({});
    }
  }
}
