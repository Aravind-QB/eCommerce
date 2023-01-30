import { Product } from '../../entities/products/products.entity';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(response: any, product: Product): Promise<any>;
    fetchAll(response: any): Promise<any>;
    findById(response: any, id: any): Promise<any>;
    findByCategory(response: any, id: any): Promise<any>;
}
