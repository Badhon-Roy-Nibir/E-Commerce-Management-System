import { Address } from './entities/address.entity.js';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/create-address.dto.js';
import { Users } from '../users/entities/users.entity.js';
import { UpdateAddressDto } from './dtos/update-address.dto.js';
export declare class AddressService {
    private readonly addressRepo;
    private readonly userRepo;
    constructor(addressRepo: Repository<Address>, userRepo: Repository<Users>);
    createAddress(add: CreateAddressDto): Promise<object>;
    updateAddress(id: number, add: UpdateAddressDto): Promise<object>;
    deleteAddress(id: number): Promise<object>;
    getAddressByUserId(id: number): Promise<object>;
    getAllAddress(): Promise<{
        data: Address[];
        message?: undefined;
    } | {
        message: string;
        data?: undefined;
    }>;
    toggleIsDefault(id: number): Promise<object>;
}
