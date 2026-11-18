import { Test, TestingModule } from '@nestjs/testing';
import { ProductCatagoryService } from './product-catagory.service.js';

describe('ProductCatagoryService', () => {
  let service: ProductCatagoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCatagoryService],
    }).compile();

    service = module.get<ProductCatagoryService>(ProductCatagoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
