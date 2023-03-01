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
        address: {
          AddressLine1: true,
          AddressLine2: true,
          AddressType: true,
          Area: true,
          City: true,
          id: true,
          Landmark: true,
          Phonenumber: true,
          State: true,
          Zipcode: true,
          IsDefault: true,
        },
        billingAddress: {
          AddressLine1: true,
          AddressLine2: true,
          AddressType: true,
          Area: true,
          City: true,
          id: true,
          Landmark: true,
          Phonenumber: true,
          State: true,
          Zipcode: true,
          IsBillingDefault: true,
        },
        payment: {
          id: true,
          cardNumber: true,
          cvv: true,
          expiryDate: true,
          issuedDate: true,
          nameOnCard: true,
          IsDefault: true,
        }
      },
      relations: {
        orderItems: {
          product: true,
        },
        user: true,
        address: true,
        billingAddress: true,
        payment: true,
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
        address: {
          AddressLine1: true,
          AddressLine2: true,
          AddressType: true,
          Area: true,
          City: true,
          id: true,
          Landmark: true,
          Phonenumber: true,
          State: true,
          Zipcode: true,
          IsDefault: true,
        },
        billingAddress: {
          AddressLine1: true,
          AddressLine2: true,
          AddressType: true,
          Area: true,
          City: true,
          id: true,
          Landmark: true,
          Phonenumber: true,
          State: true,
          Zipcode: true,
          IsBillingDefault: true,
        },
        payment: {
          id: true,
          cardNumber: true,
          cvv: true,
          expiryDate: true,
          issuedDate: true,
          nameOnCard: true,
          IsDefault: true,
        }
      },
      relations: {
        orderItems: {
          product: true,
        },
        user: true,
        address: true,
        payment: true,
        billingAddress: true,
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
        address: {
          AddressLine1: true,
          AddressLine2: true,
          AddressType: true,
          Area: true,
          City: true,
          id: true,
          Landmark: true,
          Phonenumber: true,
          State: true,
          Zipcode: true,
          IsDefault: true,
        },
        billingAddress: {
          AddressLine1: true,
          AddressLine2: true,
          AddressType: true,
          Area: true,
          City: true,
          id: true,
          Landmark: true,
          Phonenumber: true,
          State: true,
          Zipcode: true,
          IsBillingDefault: true,
        },
        payment: {
          id: true,
          cardNumber: true,
          cvv: true,
          expiryDate: true,
          issuedDate: true,
          nameOnCard: true,
          IsDefault: true,
        }
      },
      relations: {
        orderItems: {
          product: true,
        },
        user: true,
        address: true,
        billingAddress: true,
        payment: true,
      },
      where: {
        user: user,
      },
    });
  }

  createOrder(order: Order): Promise<Order> {
    try {
      const newOrder = this.ordersRepository.save(order);
      return newOrder;
    } catch (error) {
      return error;
    }
  }

  findDefaultPayment(user: any): Promise<Order[]> {
    return this.ordersRepository.find({
      select: {
        id:false,
        grandTotal: false,
        status: false,
        payment: {
          id: true,
          cardNumber: true,
          cvv: true,
          expiryDate: true,
          issuedDate: true,
          nameOnCard: true,
          IsDefault: true,
        }
      },
      relations: {
        // user: true,
        payment: true,
      },
      where: {
        user: user,
        payment: {
          IsDefault: true,
        }
      },
    });
  }
}
