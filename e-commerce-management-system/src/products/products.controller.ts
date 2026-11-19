import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { Products } from './entities/products.entity.js';
import { PartialUpdateProductdto } from './dtos/partial-update-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles/roles/roles.decorator.js';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @ApiBearerAuth()
  @Roles("Admin")
  @Post('create-product')
  async createProduct(@Body() product: CreateProductDto): Promise<Object>{
    return await this.productsService.createProduct(product);
  }


  @Get('all-product')
  async findProducts(){
    return await this.productsService.findAllProducts();
  }

  @Get('findOne/:id')
  async findOneProduct(@Param('id') id: number): Promise<Products | string> {
    return await this.productsService.findOneProduct(id);
  }

  @Get('searchByName')
  async searchProductByName(@Query('name') name: string): Promise<Object | string> {
    return await this.productsService.searchProductByName(name);
  }

  @ApiBearerAuth()
  @Roles("Manager", "Admin")
  @Patch(':id')
  async updateProductPartially(@Body() product:PartialUpdateProductdto,@Param('id',ParseIntPipe) id:number,):Promise<Object | string>{
    return await this.productsService.updateProduct(id,product);
  }

  @ApiBearerAuth()
  @Roles("Manager", "Admin")
  @Put(':id')
  async replaceProduct(@Body() product:UpdateProductDto,@Param('id',ParseIntPipe) id:number,):Promise<Object | string>{
    return await this.productsService.updateProduct(id,product);
  }

  @ApiBearerAuth()
  @Roles("Manager", "Admin")
  @Delete(':id')
  async deleteProductByIdSoft(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return await this.productsService.deleteproductByIdSoft(id);
  }

  
  
}
