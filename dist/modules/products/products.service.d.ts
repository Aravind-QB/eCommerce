import { Repository } from 'typeorm';
import { Product } from '../../entities/products/products.entity';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product[]>;
    findByCategory(id: number): Promise<Product[]>;
    createProduct(product: Product): Promise<Product>;
}
