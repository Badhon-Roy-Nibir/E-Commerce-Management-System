import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service.js';
import { CreateAddressDto } from './dtos/create-address.dto.js';
import { UpdateAddressDto } from './dtos/update-address.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';


@ApiTags('address')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles("Customer")
  @Post("Create-address")
  createAddresss(@Body() add: CreateAddressDto): Promise<object>{
    return this.addressService.createAddress(add);

  }
  
  @Roles("Customer")
  @Patch("Update-address/:id")
  updateAddress(@Param('id', ParseIntPipe) id: number,@Body() add: UpdateAddressDto ): Promise<object>{
    return this.addressService.updateAddress(id, add);

  }
  @Roles("Customer")
  @Delete("delete-address/:id")
  deleteAddress(@Param('id',ParseIntPipe) id: number): Promise<object>{
    return this.addressService.deleteAddress(id);

  }
  @Roles("Admin", "Manager")
  @Get('Get-AddressByUserID/:id')
  getAddressByUserId(@Param('id', ParseIntPipe)id: number): Promise<object>{
    return this.addressService.getAddressByUserId(id);
  }
  @Roles("Admin", "Manager")
  @Get('getAllAddress')
  getAllAddress(){
    return this.addressService.getAllAddress();
  }
  @Roles("Customer")
  @Patch('toggle/:id')
  toggleIsDefault(@Param('id', ParseIntPipe) id: number ){
    return this.addressService.toggleIsDefault(id);

  }

}
