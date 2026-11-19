import { AddressService } from './address.service.js';
import { CreateAddressDto } from './dtos/create-address.dto.js';
import { UpdateAddressDto } from './dtos/update-address.dto.js';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    createAddresss(add: CreateAddressDto): Promise<object>;
    updateAddress(id: number, add: UpdateAddressDto): Promise<object>;
    deleteAddress(id: number): Promise<object>;
    getAddressByUserId(id: number): Promise<object>;
    getAllAddress(): Promise<{
        data: import("./entities/address.entity.js").Address[];
        message?: undefined;
    } | {
        message: string;
        data?: undefined;
    }>;
    toggleIsDefault(id: number): Promise<object>;
}
