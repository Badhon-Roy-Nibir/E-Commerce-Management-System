import { Repository } from 'typeorm';
import { ProductCatagory } from './entities/product-category.entity.js';
import { CreateProductCatagoryDto } from './dto/create-product-category.dto.js';
import { UpdateProductCatagoryDto } from './dto/update-product-category.dto.js';
import { PartialUpdateProductCatagoryDto } from './dto/partial-update-product-category.dto.js';
export declare class ProductCatagoryService {
    private readonly catagoryRepo;
    constructor(catagoryRepo: Repository<ProductCatagory>);
    createCatagory(catagory: CreateProductCatagoryDto): Promise<string>;
    getAllCatagories(): Promise<ProductCatagory[]>;
    getCatagoryById(id: number): Promise<ProductCatagory | string>;
    replaceCatagory(id: number, catagory: UpdateProductCatagoryDto): Promise<string>;
    updateCatagory(id: number, catagory: PartialUpdateProductCatagoryDto): Promise<string>;
    deleteCatagoryById(id: number): Promise<string>;
    deleteCatagoryByIdSoft(id: number): Promise<string>;
}
