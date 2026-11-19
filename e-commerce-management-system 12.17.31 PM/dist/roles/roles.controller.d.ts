import { RolesService } from './roles.service.js';
import { CreateRolesDto } from './dtos/create-roles.dto.js';
import { UpdateRolesDto } from './dtos/update-roles.dto.js';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    createRoles(roles: CreateRolesDto): Promise<object>;
    getAllRoles(): Promise<object>;
    getRolesById(id: number): Promise<object>;
    updateRole(id: number, role: UpdateRolesDto): Promise<object>;
    deleteRole(id: number): Promise<object>;
}
