import { Products } from './entities/products.entity.js';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { PartialUpdateProductdto } from './dtos/partial-update-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';
export declare class ProductsService {
    private readonly productsRepo;
    constructor(productsRepo: Repository<Products>);
    createProduct(product: CreateProductDto): Promise<Object>;
    findAllProducts(): Promise<Object>;
    findOneProduct(id: number): Promise<Products | string>;
    searchProductByName(name: string): Promise<Object | string>;
    updateProduct(id: number, product: PartialUpdateProductdto): Promise<Object | string>;
    replaceProduct(id: number, product: UpdateProductDto): Promise<Object | string>;
    deleteproductByIdSoft(id: number): Promise<string>;
}
