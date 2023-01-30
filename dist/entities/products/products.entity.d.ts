import { Offer } from '../offers/offers.entity';
import { OrderItems } from '../order/order-items.entity';
import { ProductReviews } from '../product-review/product-review.entity';
import { Categories } from './categories.entity';
import { ProductImages } from './productImages.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    unit: string;
    inventory: string;
    price: string;
    rating: string;
    thumbnail: string;
    brand: string;
    discountPercentage: string;
    isActive: boolean;
    category: Categories;
    productImages: ProductImages[];
    orderItems: OrderItems;
    offer: Offer;
    review: ProductReviews;
}
