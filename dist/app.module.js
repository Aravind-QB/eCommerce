"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./modules/users/users.module");
const products_module_1 = require("./modules/products/products.module");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./entities/users/users.entity");
const products_entity_1 = require("./entities/products/products.entity");
const categories_entity_1 = require("./entities/products/categories.entity");
const productImages_entity_1 = require("./entities/products/productImages.entity");
const offers_module_1 = require("./modules/offers/offers.module");
const order_module_1 = require("./modules/order/order.module");
const order_entity_1 = require("./entities/order/order.entity");
const order_items_entity_1 = require("./entities/order/order-items.entity");
const auth_module_1 = require("./modules/auth/auth.module");
const auth_interceptor_1 = require("./interceptor/auth.interceptor");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const offers_entity_1 = require("./entities/offers/offers.entity");
const throttler_1 = require("@nestjs/throttler");
const category_module_1 = require("./modules/category/category.module");
const product_review_module_1 = require("./modules/product-review/product-review.module");
const product_review_entity_1 = require("./entities/product-review/product-review.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 10,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                port: 3306,
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: [
                    users_entity_1.User,
                    products_entity_1.Product,
                    categories_entity_1.Categories,
                    productImages_entity_1.ProductImages,
                    order_entity_1.Order,
                    order_items_entity_1.OrderItems,
                    offers_entity_1.Offer,
                    product_review_entity_1.ProductReviews,
                ],
                synchronize: true,
                autoLoadEntities: true,
            }),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            offers_module_1.OffersModule,
            order_module_1.OrderModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            product_review_module_1.ProductReviewModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: auth_interceptor_1.AuthInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map