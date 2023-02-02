import { Test, TestingModule } from '@nestjs/testing';
import { ProductWishlistController } from './product-wishlist.controller';

describe('ProductWishlistController', () => {
  let controller: ProductWishlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductWishlistController],
    }).compile();

    controller = module.get<ProductWishlistController>(ProductWishlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
