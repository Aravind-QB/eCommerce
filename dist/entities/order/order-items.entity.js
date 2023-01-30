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
exports.OrderItems = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const products_entity_1 = require("../products/products.entity");
let OrderItems = class OrderItems {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], OrderItems.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderItems.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderItems.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, (order) => order.id, {
        nullable: false,
    }),
    __metadata("design:type", order_entity_1.Order)
], OrderItems.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.Product, (product) => product.id, {
        nullable: false,
    }),
    __metadata("design:type", products_entity_1.Product)
], OrderItems.prototype, "product", void 0);
OrderItems = __decorate([
    (0, typeorm_1.Entity)()
], OrderItems);
exports.OrderItems = OrderItems;
//# sourceMappingURL=order-items.entity.js.map