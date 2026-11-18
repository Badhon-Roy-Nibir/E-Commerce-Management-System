import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Roles } from './entities/roles.entity.js';
import { CreateRolesDto } from './dtos/create-roles.dto.js';
import { UpdateRolesDto } from './dtos/update-roles.dto.js';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Roles) private readonly rolesRepo: Repository<Roles>){}

    async createRoles(roles: CreateRolesDto): Promise<object>{
        try{
            const check = await this.rolesRepo.findOne({
                where: {
                    name: roles.name
                }
            })
            if(check){
                return {
                    message: `Role with name: ${check.name} already exists`
                }
            }
            const newRole = await this.rolesRepo.create(roles);
            await this.rolesRepo.save(newRole);
            return {
                message: "Role Created!",
                data: newRole,
            }
        }catch{
            throw new BadRequestException("Role is not Created");
        }

    }

    async getAllRoles(): Promise<object>{
        try{
            const roles = await this.rolesRepo.find({
                select: {
                    roleId: true,
                    name: true,
                    description: true,
                }
            });
            return {
                message: "All Roles!",
                data: roles,
            }
        }catch{
            throw new BadRequestException("Roles are not found!");
        }
    }
    async getRolesById(id: number): Promise<object>{
        try{
            const roles = await this.rolesRepo.findOne({
                where: {
                    roleId: id,
                }
            })
            if(roles){
                return {
                    message: `Role with id ${id}: `,
                    data: roles,
                }
            }else{
                return {
                    message: `Role with id ${id} not found!`,
                }
            }
            
        }catch{
            throw new BadRequestException("Role not found!");
        }

    }

    async updateRoles(id: number, role: UpdateRolesDto): Promise<object>{
        try{
            const updateRole = await this.rolesRepo.findOne({
                where: {roleId: id}
            })
            if(updateRole){
                const res = (await this.rolesRepo.update(id, role)).affected;
                if(res != null && res > 0){
                    return{
                        message: `Role with id ${id} is updated!`
                    }
                }else{
                    return{
                        message: `Role with id ${id} is not updated!`
                    }
                }

            }else{
                return{
                    message: `Role with id ${id} not found!`
                }
            }
        }catch{
            throw new BadRequestException('Roles not found');
        }
    }

    async deleteRole(id: number): Promise<object>{
        try{
            const role = await this.rolesRepo.findOne({
                where: {roleId: id}
            })
            if(role){
                const res = (await this.rolesRepo.delete(id)).affected;
                if(res != null && res > 0){
                    return {
                        message: `Role with id ${id} deleted!`
                    }
                }else{
                    return {
                        message:  `Role with id ${id} deleted!`
                    }
                }
            }else{
                return {
                    message: `Role with id ${id} not found!`
                }
            }
        }catch{
            throw new BadRequestException('Roles not found');
        }
    }
    async searchRoles(keyword: string): Promise<object>{
        try{
                const role = await this.rolesRepo.find({
                where: {
                    name: ILike(`%${keyword}`)
                }
            });
            if(role.length > 0){
                return {
                    data: role
                }
            }else{
                return {
                    message: `Role name ${keyword} not found!`
                }
            }

        }catch{
            throw new BadRequestException("Role Invalid!!");
        }
        

    }



}
