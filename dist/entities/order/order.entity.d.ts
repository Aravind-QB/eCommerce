import { User } from '../users/users.entity';
import { OrderItems } from './order-items.entity';
export declare class Order {
    id: string;
    grandTotal: string;
    status: string;
    user: User;
    orderItems: OrderItems[];
}
