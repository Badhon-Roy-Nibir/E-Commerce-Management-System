import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service.js';
import { CreateRolesDto } from './dtos/create-roles.dto.js';
import { Roles } from './entities/roles.entity.js';
import { UpdateRolesDto } from './dtos/update-roles.dto.js';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post("Create-Roles")
  createRoles(@Body() roles: CreateRolesDto):Promise<object>{
    return this.rolesService.createRoles(roles);
  }

  @Get("Get-Roles")
  getAllRoles(): Promise<object>{
    return this.rolesService.getAllRoles();
  }

  @Get("Get-Roles/:id")
  getRolesById(@Param("id",ParseIntPipe) id: number ): Promise<object>{
    return this.rolesService.getRolesById(id);

  }
  @Patch("Update-Role/:id")
  updateRole(@Param("id", ParseIntPipe) id: number, @Body() role: UpdateRolesDto): Promise<object>{
    return this.rolesService.updateRoles(id, role);
  }

  @Delete("Delete-Role/:id")
  deleteRole(@Param("id", ParseIntPipe) id: number){

    return this.rolesService.deleteRole(id);

  }

}
