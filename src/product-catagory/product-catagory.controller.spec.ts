import { Test, TestingModule } from '@nestjs/testing';
import { ProductCatagoryController } from './product-catagory.controller.js';
import { ProductCatagoryService } from './product-catagory.service.js';

describe('ProductCatagoryController', () => {
  let controller: ProductCatagoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCatagoryController],
      providers: [ProductCatagoryService],
    }).compile();

    controller = module.get<ProductCatagoryController>(ProductCatagoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
