import { Repository } from 'typeorm';
import { Categories } from '../../entities/products/categories.entity';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Categories>);
    createCategory(category: Categories): Promise<Categories>;
    findAll(): Promise<Categories[]>;
}
