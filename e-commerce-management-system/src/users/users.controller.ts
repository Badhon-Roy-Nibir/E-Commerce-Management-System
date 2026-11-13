import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dtos/create-users.dto.js';
import { UpdateUsersDto } from './dtos/update-users.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  createUser(@Body()user: CreateUserDto): Promise<object>{
    return this.usersService.createUser(user);
  }

  @Get('Get-users')
  getAllUsers(): Promise<object>{
    return this.usersService.getAllUsers();

  }

  @Patch("Update-user/:id")
  updateUsers(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUsersDto): Promise<object>{
    return this.usersService.updateUser(id, user);
  }
  
  @Delete("delete-user/:id")
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<object>{
    return this.usersService.deleteUser(id);
  }

  
  

}
