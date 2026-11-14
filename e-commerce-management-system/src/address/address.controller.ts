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
@Roles("Admin", "Customer")
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post("Create-address")
  createAddresss(@Body() add: CreateAddressDto): Promise<object>{
    return this.addressService.createAddress(add);

  }
  @Patch("Update-address/:id")
  updateAddress(@Param('id', ParseIntPipe) id: number,@Body() add: UpdateAddressDto ): Promise<object>{
    return this.addressService.updateAddress(id, add);

  }
  @Delete("delete-address/:id")
  deleteAddress(@Param('id',ParseIntPipe) id: number): Promise<object>{
    return this.addressService.deleteAddress(id);

  }
  @Get('getAddress/:id')
  getAddressByUserId(@Param('id', ParseIntPipe)id: number): Promise<object>{
    return this.addressService.getAddressByUserId(id);
  }
  @Get('getAllAddress')
  getAllAddress(){
    return this.addressService.getAllAddress();
  }
  @Patch('toggle/:id')
  toggleIsDefault(@Param('id', ParseIntPipe) id: number ){
    return this.addressService.toggleIsDefault(id);

  }

}
