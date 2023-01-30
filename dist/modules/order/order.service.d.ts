import { Repository } from 'typeorm';
import { Order } from '../../entities/order/order.entity';
export declare class OrderService {
    private ordersRepository;
    constructor(ordersRepository: Repository<Order>);
    findOne(id: string): Promise<Order[]>;
    findOneByStatus(status: string, user: any): Promise<Order[]>;
    findByUser(user: any): Promise<Order[]>;
    createOrder(order: Order): Promise<Order>;
}
