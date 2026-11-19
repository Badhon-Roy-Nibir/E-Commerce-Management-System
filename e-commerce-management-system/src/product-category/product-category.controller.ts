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
  UseGuards,
} from '@nestjs/common';

import { ProductCatagoryService } from './product-category.service.js';
import { CreateProductCatagoryDto } from './dto/create-product-category.dto.js';
import { UpdateProductCatagoryDto } from './dto/update-product-category.dto.js';
import { PartialUpdateProductCatagoryDto } from './dto/partial-update-product-category.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';


@ApiTags('product-category')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('product-catagory')
export class ProductCatagoryController {

  constructor(
    private readonly productCatagoryService: ProductCatagoryService,
  ) {}

  @Roles("Admin")
  @Post('create-catagory')
  async createProductCatagory(
    @Body() catagory: CreateProductCatagoryDto,
  ) {
    return await this.productCatagoryService.createCatagory(catagory);
  }

  @Roles("Admin", "Manager", "Customer","Guest user")
  @Get()
  async getAllProductCatagories() {
    return await this.productCatagoryService.getAllCatagories();
  }

  @Roles("Admin", "Manager", "Customer","Guest user")
  @Get('getCatagory/:id')
  async getProductCatagoryById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productCatagoryService.getCatagoryById(id);
  }

  @Roles("Admin")
  @Put('replaceCatagory/:id')
  async replaceProductCatagory(
    @Body() catagory: UpdateProductCatagoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productCatagoryService.replaceCatagory(id, catagory);
  }

  @Roles("Admin")
  @Patch('updateCatagory/:id')
  async updateProductCatagoryPartially(
    @Body() catagory: PartialUpdateProductCatagoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productCatagoryService.updateCatagory(id, catagory);
  }

  @Roles("Admin")
  @Delete('deleteCatagory/:id')
  async deleteProductCatagory(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productCatagoryService.deleteCatagoryById(id);
  }

  @Roles("Admin")
  @Delete('deleteCatagory/soft/:id')
  async deleteProductCatagorySoft(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productCatagoryService.deleteCatagoryByIdSoft(id);
  }
}