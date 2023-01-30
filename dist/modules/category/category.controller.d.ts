import { Categories } from '../../entities/products/categories.entity';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createCategory(response: any, category: Categories): Promise<any>;
    fetchAll(response: any): Promise<any>;
}
