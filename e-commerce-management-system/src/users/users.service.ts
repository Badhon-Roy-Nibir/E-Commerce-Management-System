import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity.js';
import { CreateUserDto } from './dtos/create-users.dto.js';
import { Roles } from '../roles/entities/roles.entity.js';
import { NotFoundError } from 'rxjs';
import { UpdateUsersDto } from './dtos/update-users.dto.js';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private readonly userRepo: Repository<Users>, 
                @InjectRepository(Roles) private readonly roleRepo: Repository<Roles>)
                {}

    async createUser(user: CreateUserDto): Promise<object>{
        try{
            
            const role = await this.roleRepo.findOne({
                where: {
                    roleId: user.roleId
                }
            });
            if(!role){
                return{
                    message: "Role doesnot exist"
                }
            }
            const hasPass = await bcrypt.hash(user.password,10);
            user.password = hasPass;
            const newUser = await this.userRepo.create({
                name: user.name,
                email: user.email,
                password: user.password,
                isActive: user.isActive,
                role: role
            });

            this.userRepo.save(newUser);
            if(newUser){
                return {
                    message: "New User Created!",
                    data: newUser
                }
            }else{
                return {
                    message: "User not created!"
                }
            }
        }catch(error){
            console.log(error);
            throw new BadRequestException("No User found!");
        }

    }

    async getAllUsers(): Promise<object>{
        try{
            const user = await this.userRepo.find({
                select:{
                    userId: true,
                    name: true,
                    email: true,
                    isActive: true,
                    role: {
                        name: true
                    },
                    address: {
                        city: true,
                        country: true,
                        line1: true,
                        phone: true,
                        isDefault: true
                    }

                },
                relations:{
                    role: true,
                    address: true
                }
            });
            if(user){
                return {
                    message: 'All Users',
                    data: user.map(user=>({
                        userId: user.userId,
                        name: user.name,
                        iaActive: user.isActive,
                        roleName: user.role?.name,
                        address: user.address,
                    }))
                }
            }else{
                return{
                    message: "No users found!"
                }
            }
        }catch{
            throw new BadRequestException("No users!");
        }
    }
    async getUserById(id: number): Promise<Users | string>{
        try{
            const user = await this.userRepo.findOne({
                where: {
                    userId: id
                },
                relations: {
                    role: true,
                    address: true
                }
            });
            if(user){
                return user;
            }else{
                return `User with id ${id} not found!`;
            }
        }catch{
            throw new BadRequestException("User not found!");
        }

    }
    async updateUser(id: number, user: UpdateUsersDto): Promise<object>{
        try{

            const updatedUser = await this.userRepo.findOne({
                where: {
                    userId: id,
                }
            });
            if(updatedUser){
                const res = (await this.userRepo.update(id, user)).affected;
                if(res != null && res > 0){
                    return {
                        message: `user with id ${id} updated`
                    }
                }else{
                    return {
                        message: `user with id ${id} not updated`
                    }
                }
            }else{
                return{
                    message: `user with id ${id} not found`
                }
            }
        }catch{
            throw new BadRequestException("No users!");
        }
    }

    async deleteUser(id: number): Promise<object>{
        try{

            const user = await this.userRepo.findOne({
                where: {
                    userId: id
                }
            });
            if(user){
                const res = (await this.userRepo.softDelete(id)).affected;
                if(res !=null && res > 0){
                    return{
                        message: `User with id ${id} deleted`
                    }
                }else{
                    return{
                        message: `User with id ${id} not deleted`
                    }
                }
            }else{
                return {
                    message: `User with id ${id} not found`
                }
            }
        }catch{
            throw new BadRequestException("UserNot Found")
        }

    }



}
