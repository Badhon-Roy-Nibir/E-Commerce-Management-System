var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity.js';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity.js';
let AddressService = class AddressService {
    addressRepo;
    userRepo;
    constructor(addressRepo, userRepo) {
        this.addressRepo = addressRepo;
        this.userRepo = userRepo;
    }
    async createAddress(add) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    userId: add.userId
                }
            });
            if (!user) {
                return {
                    message: `user with id ${add.userId} doesnot exists`,
                };
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
            if (newAdd) {
                return {
                    message: "Address Added!"
                };
            }
            else {
                return {
                    message: "Adddress not Created!"
                };
            }
        }
        catch {
            throw new BadRequestException("Address not found!");
        }
    }
    async updateAddress(id, add) {
        try {
            const updatedAddress = await this.addressRepo.findOne({
                where: {
                    addressId: id
                }
            });
            if (updatedAddress) {
                const res = (await this.addressRepo.update(id, add)).affected;
                if (res != null && res > 0) {
                    return {
                        message: `Address with id ${id} updated`
                    };
                }
                else {
                    return {
                        message: `Address with id ${id} not updated`
                    };
                }
            }
            else {
                return {
                    message: `Address with id ${id} not found`
                };
            }
        }
        catch {
            throw new BadRequestException("Address not found!");
        }
    }
    async deleteAddress(id) {
        try {
            const add = await this.addressRepo.findOne({
                where: {
                    addressId: id
                }
            });
            if (add) {
                const res = (await this.addressRepo.softDelete(id)).affected;
                if (res != null && res > 0) {
                    return {
                        message: `Address with id ${id} is deleted`
                    };
                }
                else {
                    return {
                        message: `Address with id ${id} not deleted`
                    };
                }
            }
            else {
                return {
                    message: `Address with id ${id} not found`
                };
            }
        }
        catch {
            throw new BadRequestException("Address not found!");
        }
    }
    async getAddressByUserId(id) {
        try {
            const add = await this.addressRepo.find({
                where: {
                    user: {
                        userId: id,
                    }
                }
            });
            if (add.length > 0) {
                return {
                    message: `Addresses of user with id ${id}: `,
                    data: add
                };
            }
            else {
                return {
                    message: `Addresses of user with id ${id} not found`
                };
            }
        }
        catch {
            throw new BadRequestException("Address not found");
        }
    }
    async getAllAddress() {
        try {
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
            if (add.length > 0) {
                return {
                    data: add,
                };
            }
            else {
                return {
                    message: "No addresses"
                };
            }
        }
        catch {
            throw new BadRequestException("Address not found!");
        }
    }
    async toggleIsDefault(id) {
        try {
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
            if (add) {
                add.isDefault = !add.isDefault;
                const updateAdd = (await this.addressRepo.update(id, add)).affected;
                if (updateAdd != null && updateAdd > 0) {
                    return {
                        message: `Address with id ${id} toggled!`,
                        data: add
                    };
                }
                else {
                    return {
                        message: `Address with id ${id} not toggled!`,
                    };
                }
            }
            else {
                return {
                    message: `Address with id ${id} not found!`,
                };
            }
        }
        catch {
            throw new BadRequestException("Address not found!");
        }
    }
};
AddressService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Address)),
    __param(1, InjectRepository(Users)),
    __metadata("design:paramtypes", [Repository,
        Repository])
], AddressService);
export { AddressService };
//# sourceMappingURL=address.service.js.map