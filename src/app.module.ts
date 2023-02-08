import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users/users.entity';
import { Product } from './entities/products/products.entity';
import { Categories } from './entities/products/categories.entity';
import { ProductImages } from './entities/products/productImages.entity';
import { OffersModule } from './modules/offers/offers.module';
import { OrderModule } from './modules/order/order.module';
import { Order } from './entities/order/order.entity';
import { OrderItems } from './entities/order/order-items.entity';
import { AuthModule } from './modules/auth/auth.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Offer } from './entities/offers/offers.entity';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { CategoryModule } from './modules/category/category.module';
import { ProductReviewModule } from './modules/product-review/product-review.module';
import { ProductReviews } from './entities/product-review/product-review.entity';
import { ProductCategoriesMapper } from './entities/products/productCategoryMapper.entity';
import { ProductWishlistModule } from './modules/product-wishlist/product-wishlist.module';
import { ProductWishlist } from './entities/products/productWishlist.entity';
import { Addresses } from './entities/users/user-addresses';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Product,
        Categories,
        ProductImages,
        Order,
        OrderItems,
        Offer,
        ProductReviews,
        ProductCategoriesMapper,
        ProductWishlist,
        Addresses
      ],
      synchronize: true,
      autoLoadEntities: true,
      // dropSchema: true,
    }),
    UsersModule,
    ProductsModule,
    OffersModule,
    OrderModule,
    AuthModule,
    CategoryModule,
    ProductReviewModule,
    ProductWishlistModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
