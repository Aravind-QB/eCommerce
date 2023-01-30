import { Order } from '../../entities/order/order.entity';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(req: any, response: any, order: Order): Promise<any>;
    findById(response: any, id: any): Promise<any>;
    findByUser(req: any, response: any): Promise<any>;
}
