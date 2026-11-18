import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryController } from './product-category.controller.js';
import { ProductCategoryService } from './product-category.service.js';

describe('ProductCategoryController', () => {
  let controller: ProductCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCategoryController],
      providers: [ProductCategoryService],
    }).compile();

    controller = module.get<ProductCategoryController>(ProductCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
