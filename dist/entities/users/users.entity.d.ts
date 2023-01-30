import { Order } from '../order/order.entity';
import { ProductReviews } from '../product-review/product-review.entity';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
    isActive: boolean;
    order: Order;
    review: ProductReviews;
}
