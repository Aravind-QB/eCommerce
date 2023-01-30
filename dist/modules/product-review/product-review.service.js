"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_review_entity_1 = require("../../entities/product-review/product-review.entity");
const typeorm_2 = require("typeorm");
let ProductReviewService = class ProductReviewService {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    createOffer(review) {
        try {
            const newoffer = this.reviewRepository.save(review);
            return newoffer;
        }
        catch (error) {
            return error;
        }
    }
    findAll(user) {
        return this.reviewRepository.find({
            select: {
                id: true,
                title: true,
                description: true,
                rating: true,
            },
            relations: {
                product: {
                    productImages: true,
                },
            },
            where: {
                isActive: true,
                user,
            },
        });
    }
    fetchAllByProduct(pid) {
        return this.reviewRepository.find({
            select: {
                id: true,
                title: true,
                description: true,
                rating: true,
                user: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true,
                },
            },
            relations: {
                user: true,
            },
            where: {
                isActive: true,
                product: {
                    id: pid,
                },
            },
        });
    }
};
ProductReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_review_entity_1.ProductReviews)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductReviewService);
exports.ProductReviewService = ProductReviewService;
//# sourceMappingURL=product-review.service.js.map