import { Product } from '../products/products.entity';
import { User } from '../users/users.entity';
export declare class ProductReviews {
    id: string;
    title: string;
    description: string;
    rating: string;
    isActive: boolean;
    product: Product;
    user: User;
}
