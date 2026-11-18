import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity.js';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { PartialUpdateProductdto } from './dtos/partial-update-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Products) private readonly productsRepo: Repository<Products>){}

    async createProduct(product: CreateProductDto): Promise<Object>{
        try{
            const pro = this.productsRepo.create(product);
            const saveProduct = await this.productsRepo.save(pro);
            return{
                message: 'Product Created successfully',
                data: saveProduct
            }

        }catch{
            throw new BadRequestException('Product failed to create');
        }
    }

     async findAllProducts():Promise<Object>{
        try{
            const pro = await this.productsRepo.find({
                select:{
                    productId:true,
                    name:true,
                    price:true,
                    stockQuantity:true,
                }
            });
        return{
            message: 'Products retrieved successfully',
            count: pro.length,
            data: pro,
        };

        }catch{
            throw new BadRequestException('Products are not found');
        }
        
    }
      async findOneProduct(id:number): Promise<Products | string> {
        try{
            const pro = await this.productsRepo.findOne({
                where: { 
                    productId: id
                },select:{
                    name:true,
                    price:true,
                    stockQuantity:true,
                    createdAt:true,
                    updatedAt:true
                }
            });
            if(!pro){
                return `Product with ID ${id} is not found`;
            }
            return pro;

        }catch{
            throw new BadRequestException(`Product with ${id} is not found`)
        }
    }

    async searchProductByName(name: string): Promise<Object | string> {
    try {
        const pro = await this.productsRepo.find({
            where: {
                name: Like(`%${name}%`)
            },select:{
                name:true,
                price:true,
                stockQuantity:true,
            }
        });

        if (pro.length > 0) {
            return {
                message: `Products matching "${name}" retrieved successfully`,
                data: pro
            };
        } else {
            return `No products found with name "${name}"`;
        }

    } catch {
        throw new BadRequestException(`Failed to search products with name "${name}"`);
    }
}

    async updateProduct(id: number,product:PartialUpdateProductdto): Promise<Object | string> {
    try {
        const pro = await this.productsRepo.findOne({where:{ productId: id }});
        if (pro) {
            const res = (await this.productsRepo.update(id, product)).affected;

            if (res != null && res > 0) {
                const updatedProduct = await this.productsRepo.findOne({
                    where: { 
                        productId: id 
                    },select:{
                        productId:true,
                        name:true,
                        price:true,
                        stockQuantity:true,

                    },
                    relations: {
                        productCategory: true,
                    }
                });
                return {
                    message: `Product with ID ${id} updated successfully`,
                    data: updatedProduct!
                };
            } else {
                return `Product with ID ${id} failed to be updated`;
            }
        } else {
            return `Product with ID ${id} not found`;
        }

    } catch {
        throw new BadRequestException(`Product with ID ${id} failed to update`);
    }
}

async replaceProduct(id: number,product: UpdateProductDto): Promise<Object | string> {
    try {
        const pro = await this.productsRepo.findOne({where:{ productId: id }});
        if (pro) {
            const res = (await this.productsRepo.update(id, product)).affected;

            if (res != null && res > 0) {
                const replaceProduct = await this.productsRepo.findOne({
                    where: { 
                        productId: id 
                    },select:{
                        productId:true,
                        name:true,
                        price:true,
                        stockQuantity:true,

                    },
                    relations: {
                        productCategory: true
                    }
                });
                return {
                    message: `Product with ID ${id} replaced successfully`,
                    data: replaceProduct!
                };
            } else {
                return `Product with ID ${id} failed to be replaced`;
            }
        } else {
            return `Product with ID ${id} not found`;
        }

    } catch {
        throw new BadRequestException(`Product with ID ${id} failed to replace`);
    }
}

async deleteproductByIdSoft(id: number): Promise<string> {
    try {
        const pro = await this.productsRepo.findOne({
            where: { productId: id }
        });

        if (pro) {
            const res = (await this.productsRepo.softDelete(id)).affected;

            if (res != null && res > 0) {
                return `Product with ID ${id} deleted successfully`;
            } else {
                return `Product with ID ${id} failed to delete`;
            }

        } else {
            return `Product with ID ${id} not found`;
        }

    } catch {
        throw new BadRequestException(`Product with ID ${id} failed to delete`);
    }
}





}
