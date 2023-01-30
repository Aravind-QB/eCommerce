import { Order } from './order.entity';
import { Product } from '../products/products.entity';
export declare class OrderItems {
    id: string;
    total: string;
    quantity: string;
    order: Order;
    product: Product;
}
