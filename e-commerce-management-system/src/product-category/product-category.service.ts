import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCatagory } from './entities/product-category.entity.js';
import { CreateProductCatagoryDto } from './dto/create-product-category.dto.js';
import { UpdateProductCatagoryDto } from './dto/update-product-category.dto.js';
import { PartialUpdateProductCatagoryDto } from './dto/partial-update-product-category.dto.js';

@Injectable()
export class ProductCatagoryService {

  constructor(
    @InjectRepository(ProductCatagory)
    private readonly catagoryRepo: Repository<ProductCatagory>,
  ) {}

  async createCatagory(catagory: CreateProductCatagoryDto): Promise<string> {
    try {
      const newCatagory = this.catagoryRepo.create(catagory);
      await this.catagoryRepo.save(newCatagory);

      return 'Catagory created successfully';
    } catch {
      throw new BadRequestException('Catagory failed to create');
    }
  }

  async getAllCatagories(): Promise<ProductCatagory[]> {
    return await this.catagoryRepo.find({
      order: { createdDate: 'DESC' },
    });
  }

  async getCatagoryById(id: number): Promise<ProductCatagory | string> {
    const catagory = await this.catagoryRepo.findOne({
      where: { categoryId: id },
    });
  if (catagory!=null) {
  return catagory;
  }
  else
    return `Category with id ${id} not found`;
}


  async replaceCatagory(
    id: number,catagory: UpdateProductCatagoryDto,
  ): Promise<string> {

    const res = await this.catagoryRepo.findOne({
      where: { categoryId: id },
    });

    if (res) {
      const res = (await this.catagoryRepo.update(id, catagory)).affected;

      if (res != null && res > 0) {
        return `Catagory with id ${id} is replaced`;
      } else {
        return `Catagory with id ${id} failed to be replaced`;
      }
    }
    return `Catagory with id ${id} not found`;
  }

  async updateCatagory(
    id: number,catagory: PartialUpdateProductCatagoryDto,
  ): Promise<string> {
    const res = await this.catagoryRepo.findOne({
      where: { categoryId: id },
    });

    if (res) {
      const res = (await this.catagoryRepo.update(id, catagory)).affected;

      if (res != null && res > 0) {
        return `Catagory with id ${id} is updated`;
      } else {
        return `Catagory with id ${id} failed to be updated`;
      }
    }
    return `Catagory with id ${id} not found`;
  }

   async deleteCatagoryById(id: number): Promise<string> {
    const res = (await this.catagoryRepo.delete(id)).affected;

    if (res != null && res > 0) {
      return `Catagory with id ${id} deleted`;
    } else {
      return `Catagory with id ${id} not found`;
    }
  }
  async deleteCatagoryByIdSoft(id: number): Promise<string> {
    const res = (await this.catagoryRepo.softDelete(id)).affected;

    if (res != null && res > 0) {
      return `Catagory with id ${id} deleted`;
    } else {
      return `Catagory with id ${id} not found`;
    }
  }
}