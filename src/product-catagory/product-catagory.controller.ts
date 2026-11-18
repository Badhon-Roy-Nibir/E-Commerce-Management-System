import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';

import { ProductCatagoryService } from './product-catagory.service.js';
import { CreateProductCatagoryDto } from './dto/create-product-catagory.dto.js';
import { UpdateProductCatagoryDto } from './dto/update-product-catagory.dto.js';
import { PartialUpdateProductCatagoryDto } from './dto/partial-update-product-catagory.dto.js';

@Controller('product-catagory')
export class ProductCatagoryController {

  constructor(
    private readonly productCatagoryService: ProductCatagoryService,
  ) {}

  @Post('create-catagory')
  async createProductCatagory(
    @Body() catagory: CreateProductCatagoryDto,
  ) {
    return await this.productCatagoryService.createCatagory(catagory);
  }

  @Get()
  async getAllProductCatagories() {
    return await this.productCatagoryService.getAllCatagories();
  }

  @Get('getCatagory/:id')
  async getProductCatagoryById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productCatagoryService.getCatagoryById(id);
  }

  @Put('replaceCatagory/:id')
  async replaceProductCatagory(
    @Body() catagory: UpdateProductCatagoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productCatagoryService.replaceCatagory(id, catagory);
  }

  @Patch('updateCatagory/:id')
  async updateProductCatagoryPartially(
    @Body() catagory: PartialUpdateProductCatagoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productCatagoryService.updateCatagory(id, catagory);
  }

  @Delete('deleteCatagory/:id')
  async deleteProductCatagory(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productCatagoryService.deleteCatagoryById(id);
  }

  @Delete('deleteCatagory/soft/:id')
  async deleteProductCatagorySoft(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productCatagoryService.deleteCatagoryByIdSoft(id);
  }
}