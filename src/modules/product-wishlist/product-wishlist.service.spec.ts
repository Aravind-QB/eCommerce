import { Test, TestingModule } from '@nestjs/testing';
import { ProductWishlistService } from './product-wishlist.service';

describe('ProductWishlistService', () => {
  let service: ProductWishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductWishlistService],
    }).compile();

    service = module.get<ProductWishlistService>(ProductWishlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
