import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { Products } from './entities/products.entity.js';
import { PartialUpdateProductdto } from './dtos/partial-update-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(product: CreateProductDto): Promise<Object>;
    findProducts(): Promise<Object>;
    findOneProduct(id: number): Promise<Products | string>;
    searchProductByName(name: string): Promise<Object | string>;
    updateProductPartially(product: PartialUpdateProductdto, id: number): Promise<Object | string>;
    replaceProduct(product: UpdateProductDto, id: number): Promise<Object | string>;
    deleteProductByIdSoft(id: number): Promise<string>;
}
