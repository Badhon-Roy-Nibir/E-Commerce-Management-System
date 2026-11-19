import { UsersService } from './users.service.js';
import { CreateUserDto } from './dtos/create-users.dto.js';
import { UpdateUsersDto } from './dtos/update-users.dto.js';
import { Users } from './entities/users.entity.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(user: CreateUserDto): Promise<object>;
    getAllUsers(): Promise<object>;
    getUsersByID(id: number): Promise<Users | string | object>;
    updateUsers(id: number, user: UpdateUsersDto): Promise<object>;
    deleteUser(id: number): Promise<object>;
    toggleActive(id: number): Promise<object>;
}
