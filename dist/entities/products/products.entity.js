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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const offers_entity_1 = require("../offers/offers.entity");
const order_items_entity_1 = require("../order/order-items.entity");
const product_review_entity_1 = require("../product-review/product-review.entity");
const categories_entity_1 = require("./categories.entity");
const productImages_entity_1 = require("./productImages.entity");
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "discountPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Categories, (category) => category.id, {
        nullable: false,
    }),
    __metadata("design:type", categories_entity_1.Categories)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => productImages_entity_1.ProductImages, (productImages) => productImages.product, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'productimages_id' }),
    __metadata("design:type", Array)
], Product.prototype, "productImages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_items_entity_1.OrderItems, (orderItems) => orderItems.product),
    (0, typeorm_1.JoinColumn)({ name: 'orderItems_id' }),
    __metadata("design:type", order_items_entity_1.OrderItems)
], Product.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => offers_entity_1.Offer, (offer) => offer.product),
    (0, typeorm_1.JoinColumn)({ name: 'offer_id' }),
    __metadata("design:type", offers_entity_1.Offer)
], Product.prototype, "offer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_review_entity_1.ProductReviews, (review) => review.product),
    (0, typeorm_1.JoinColumn)({ name: 'review_id' }),
    __metadata("design:type", product_review_entity_1.ProductReviews)
], Product.prototype, "review", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
//# sourceMappingURL=products.entity.js.map