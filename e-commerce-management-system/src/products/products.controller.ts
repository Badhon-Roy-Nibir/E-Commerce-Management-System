import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { Products } from './entities/products.entity.js';
import { PartialUpdateProductdto } from './dtos/partial-update-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @Post()
  async createProduct(@Body() product: CreateProductDto): Promise<Object>{
    return await this.productsService.createProduct(product);
  }

  @Get()
  async findProducts(){
    return await this.productsService.findAllProducts();
  }

   @Get(":id")
  async findOneProduct(@Param('id') id: number): Promise<Products | string> {
    return await this.productsService.findOneProduct(id);
  }

  @Patch(':id')
  async updateProductPartially(@Body() product:PartialUpdateProductdto,@Param('id',ParseIntPipe) id:number,):Promise<Object | string>{
    return await this.productsService.updateProduct(id,product);
  }

  @Put(':id')
  async replaceProduct(@Body() product:UpdateProductDto,@Param('id',ParseIntPipe) id:number,):Promise<Object | string>{
    return await this.productsService.updateProduct(id,product);
  }

  @Delete(':id')
  async deleteProductByIdSoft(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return await this.productsService.deleteproductByIdSoft(id);
  }
  
}
