import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  findOne(id: string): Promise<Order[]> {
    return this.ordersRepository.find({
      select: {
        id: true,
        grandTotal: true,
        status: true,
        orderItems: {
          id: true,
          quantity: true,
          total: true,
        },
        user: {
          id: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
        },
      },
      relations: {
        orderItems: {
          product: true,
        },
        user: true,
      },
      where: {
        id: id,
      },
    });
  }

  findOneByStatus(status: string, user: any): Promise<Order[]> {
    return this.ordersRepository.find({
      select: {
        id: true,
        grandTotal: true,
        status: true,
        orderItems: {
          id: true,
          quantity: true,
          total: true,
        },
        user: {
          id: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
        },
      },
      relations: {
        orderItems: {
          product: true,
        },
        user: true,
      },
      where: {
        status: status,
        user: user,
      },
    });
  }

  findByUser(user: any): Promise<Order[]> {
    return this.ordersRepository.find({
      select: {
        id: true,
        grandTotal: true,
        status: true,
        orderItems: {
          id: true,
          quantity: true,
          total: true,
        },
        user: {
          id: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
        },
      },
      relations: {
        orderItems: {
          product: true,
        },
        user: true,
      },
      where: {
        user: user,
      },
    });
  }

  createOrder(order: Order): Promise<Order> {
    try {
      // console.log(order);
      const newOrder = this.ordersRepository.save(order);
      return newOrder;
    } catch (error) {
      return error;
    }
  }
}
