import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dtos/create-users.dto.js';
import { UpdateUsersDto } from './dtos/update-users.dto.js';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/users.entity.js';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @UseGuards(JwtGuard, RolesGuard)
  @Roles("Admin")
  @Post('create-user')
  createUser(@Body()user: CreateUserDto): Promise<object>{
    return this.usersService.createUser(user);
  }

  @Roles("Admin", "Manager")
  @Get('Get-users')
  getAllUsers(): Promise<object>{
    return this.usersService.getAllUsers();

  }
  @Roles("Admin", "Manager")
  @Get("Get-users/:id")
  getUsersByID(@Param('id') id: number):Promise<Users | string | object>{
    return this.usersService.getUserById(id);
  }

  @Roles("Admin", "Customer", "Manager")
  @Patch("Update-user/:id")
  updateUsers(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUsersDto): Promise<object>{
    return this.usersService.updateUser(id, user);
  }

  @Roles("Admin", "Manager")
  @Delete("delete-user/:id")
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<object>{
    return this.usersService.deleteUser(id);
  }

  @Patch("toggleActive/:id")
  toggleActive(@Param('id', ParseIntPipe) id: number): Promise<object>{
    return this.usersService.toggleIsActive(id);

  }

  
  

}
