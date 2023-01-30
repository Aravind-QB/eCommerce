import { Product } from '../products/products.entity';
export declare class Offer {
    id: string;
    title: string;
    description: string;
    discountPercentage: string;
    thumbnail: string;
    isActive: boolean;
    product: Product[];
}
