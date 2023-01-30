import { ProductReviews } from 'src/entities/product-review/product-review.entity';
import { ProductReviewService } from './product-review.service';
export declare class ProductReviewController {
    private readonly reviewService;
    constructor(reviewService: ProductReviewService);
    createCategory(response: any, review: ProductReviews): Promise<any>;
    fetchAll(req: any, response: any): Promise<any>;
    fetchAllByProduct(req: any, response: any, pid: any): Promise<any>;
}
