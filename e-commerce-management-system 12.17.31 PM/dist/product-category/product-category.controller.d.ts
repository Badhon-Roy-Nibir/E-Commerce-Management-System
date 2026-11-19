import { ProductCatagoryService } from './product-category.service.js';
import { CreateProductCatagoryDto } from './dto/create-product-category.dto.js';
import { UpdateProductCatagoryDto } from './dto/update-product-category.dto.js';
import { PartialUpdateProductCatagoryDto } from './dto/partial-update-product-category.dto.js';
export declare class ProductCatagoryController {
    private readonly productCatagoryService;
    constructor(productCatagoryService: ProductCatagoryService);
    createProductCatagory(catagory: CreateProductCatagoryDto): Promise<string>;
    getAllProductCatagories(): Promise<import("./entities/product-category.entity.js").ProductCatagory[]>;
    getProductCatagoryById(id: number): Promise<string | import("./entities/product-category.entity.js").ProductCatagory>;
    replaceProductCatagory(catagory: UpdateProductCatagoryDto, id: number): Promise<string>;
    updateProductCatagoryPartially(catagory: PartialUpdateProductCatagoryDto, id: number): Promise<string>;
    deleteProductCatagory(id: number): Promise<string>;
    deleteProductCatagorySoft(id: number): Promise<string>;
}
