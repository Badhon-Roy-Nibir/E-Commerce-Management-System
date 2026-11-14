import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BillsService } from './bills.service.js';
import { CreateBillsDto } from './dtos/create-bills.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';
import { UpdateBillsDto } from './dtos/update-bills.dto.js';

@ApiTags('Bill')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}


  @Roles("Admin", "Manager")
  @Post('Generate-Bill')
  createBill(@Body() bill: CreateBillsDto): Promise<object>{
    return this.billsService.createBill(bill);
  }

  @Roles("Admin", "Manager")
  @Patch("Update-Bill/:id")
  updateBill(@Param('id', ParseIntPipe) id: number, @Body() bill: UpdateBillsDto): Promise<object>{
    return this.billsService.updateBill(id, bill);

  }
  

  
}
