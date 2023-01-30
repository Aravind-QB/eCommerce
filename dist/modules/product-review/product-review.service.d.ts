import { ProductReviews } from 'src/entities/product-review/product-review.entity';
import { User } from 'src/entities/users/users.entity';
import { Repository } from 'typeorm';
export declare class ProductReviewService {
    private reviewRepository;
    constructor(reviewRepository: Repository<ProductReviews>);
    createOffer(review: ProductReviews): Promise<ProductReviews>;
    findAll(user: User): Promise<ProductReviews[]>;
    fetchAllByProduct(pid: string): Promise<ProductReviews[]>;
}
