import { Repository } from 'typeorm';
import { Roles } from './entities/roles.entity.js';
import { CreateRolesDto } from './dtos/create-roles.dto.js';
import { UpdateRolesDto } from './dtos/update-roles.dto.js';
export declare class RolesService {
    private readonly rolesRepo;
    constructor(rolesRepo: Repository<Roles>);
    createRoles(roles: CreateRolesDto): Promise<object>;
    getAllRoles(): Promise<object>;
    getRolesById(id: number): Promise<object>;
    updateRoles(id: number, role: UpdateRolesDto): Promise<object>;
    deleteRole(id: number): Promise<object>;
}
