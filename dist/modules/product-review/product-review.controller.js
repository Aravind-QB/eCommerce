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
exports.ProductReviewController = void 0;
const common_1 = require("@nestjs/common");
const product_review_entity_1 = require("../../entities/product-review/product-review.entity");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const product_review_service_1 = require("./product-review.service");
let ProductReviewController = class ProductReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async createCategory(response, review) {
        const newreview = await this.reviewService.createOffer(review);
        if (!!newreview) {
            return response.status(common_1.HttpStatus.CREATED).json({
                success: 'Review created successfully',
            });
        }
        else {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                failed: 'Review creation failed',
            });
        }
    }
    async fetchAll(req, response) {
        const reviews = await this.reviewService.findAll(req.user.user);
        return response.status(common_1.HttpStatus.OK).json({
            reviews,
        });
    }
    async fetchAllByProduct(req, response, pid) {
        const reviews = await this.reviewService.fetchAllByProduct(pid);
        return response.status(common_1.HttpStatus.OK).json({
            reviews,
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_review_entity_1.ProductReviews]),
    __metadata("design:returntype", Promise)
], ProductReviewController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductReviewController.prototype, "fetchAll", null);
__decorate([
    (0, common_1.Get)('byproduct/:pid'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('pid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductReviewController.prototype, "fetchAllByProduct", null);
ProductReviewController = __decorate([
    (0, common_1.Controller)('productreview'),
    __metadata("design:paramtypes", [product_review_service_1.ProductReviewService])
], ProductReviewController);
exports.ProductReviewController = ProductReviewController;
//# sourceMappingURL=product-review.controller.js.map