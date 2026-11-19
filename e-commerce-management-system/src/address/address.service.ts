import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity.js';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/create-address.dto.js';
import { Users } from '../users/entities/users.entity.js';
import { UpdateAddressDto } from './dtos/update-address.dto.js';

@Injectable()
export class AddressService {

    constructor(@InjectRepository(Address) private readonly addressRepo: Repository<Address>,
                @InjectRepository(Users) private readonly userRepo: Repository<Users>){}

    async createAddress(add: CreateAddressDto):Promise<object>{
        try{
            const user = await this.userRepo.findOne({
                where: {
                    userId: add.userId
                }
            });
            if(!user){
                return {
                    message: `user with id ${add.userId} doesnot exists`,
                }
            }
            const newAdd = await this.addressRepo.create({
                city: add.city,
                country: add.country,
                isDefault: add.isDefault,
                line1: add.line1,
                phone: add.phone,
                user: user
            });
            await this.addressRepo.save(newAdd);
            if(newAdd){
                return {
                    message: "Address Added!"
                }
            }else{
                return {
                    message: "Adddress not Created!"
                }
            }
            }catch(error){
                console.log(error)
                throw new BadRequestException("Address not found!");

            }
    }
    async updateAddress(id: number, add: UpdateAddressDto): Promise<object>{
        try{
            const updatedAddress = await this.addressRepo.findOne({
                where: {
                    addressId: id
                }
            });
            if(updatedAddress){
                const res = (await this.addressRepo.update(id,add)).affected;
                if(res != null && res > 0){
                    return{
                        message: `Address with id ${id} updated`
                    }
                }else{
                    return{
                        message: `Address with id ${id} not updated`
                    }
                }
            }else{
                return{
                    message: `Address with id ${id} not found`
                }
            }

        }catch{
            throw new BadRequestException("Address not found!");
        }
    }

    async deleteAddress(id: number): Promise<object>{
        try{
            const add = await this.addressRepo.findOne({
                where: {
                    addressId: id
                }
            });
            if(add){
                const res = (await this.addressRepo.softDelete(id)).affected;
                if(res != null && res > 0){
                    return{
                        message: `Address with id ${id} is deleted`
                    }
                }else{
                    return {
                        message: `Address with id ${id} not deleted`
                    }
                }
            }else{
                return {
                    message: `Address with id ${id} not found`
                }
            }
        }catch{
            throw new BadRequestException("Address not found!");
        }
    }
    async getAddressByUserId(id: number):Promise<object>{
        try{
            const add = await this.addressRepo.find({
                where: {
                    user: {
                        userId: id,
                    }
                }
            });
            if(add.length > 0){
                return{
                    message: `Addresses of user with id ${id}: `,
                    data: add
                }
            }else{
                return {
                    message: `Addresses of user with id ${id} not found`
                }
            }
        }catch{
            throw new BadRequestException("Address not found");
        }
    }

    async getAllAddress(){
        try{
            const add = await this.addressRepo.find({
                select: {
                    addressId: true,
                    city: true,
                    country: true,
                    phone: true,
                    line1: true,
                    isDefault: true,
                    user: {
                        userId: true,
                        name: true
                    }
                },
                relations: {
                    user: true
                }
            });
            if(add.length > 0){
                return {
                    data: add,
                }
            }else{
                return{
                    message: "No addresses"
                }
            }
        }catch{
            throw new BadRequestException("Address not found!");
        }
    }

    async toggleIsDefault(id: number): Promise<object>{
        try{
            const add = await this.addressRepo.findOne({
                where: {
                    addressId: id
                },
                select: {
                    addressId: true,
                    city: true,
                    country: true,
                    phone: true,
                    line1: true,
                    isDefault: true,
                    user: {
                        userId: true,
                        name: true
                    }
                },
                relations: {
                    user: true
                }
            });
            if(add){
                add.isDefault = !add.isDefault;
                const updateAdd = (await this.addressRepo.update(id, add)).affected;
                if(updateAdd != null && updateAdd > 0){
                    return{
                        message: `Address with id ${id} toggled!`,
                        data: add
                    }

                }else{
                    return{
                        message: `Address with id ${id} not toggled!`,
                    }
                }

            }else{
                return{
                    message: `Address with id ${id} not found!`,

                }
            }
        }catch{
            throw new BadRequestException("Address not found!");
        }

    }

    
    
}
