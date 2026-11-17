import { Repository } from 'typeorm';
import { Users } from './entities/users.entity.js';
import { CreateUserDto } from './dtos/create-users.dto.js';
import { Roles } from '../roles/entities/roles.entity.js';
import { UpdateUsersDto } from './dtos/update-users.dto.js';
import { MailerService } from '../mailer/mailer.service.js';
export declare class UsersService {
    private readonly userRepo;
    private readonly roleRepo;
    private readonly mailerService;
    constructor(userRepo: Repository<Users>, roleRepo: Repository<Roles>, mailerService: MailerService);
    createUser(user: CreateUserDto): Promise<object>;
    getAllUsers(): Promise<object>;
    getUserById(id: number): Promise<Users | string>;
    getUserByEmail(email: string): Promise<Users | string>;
    updateUser(id: number, user: UpdateUsersDto): Promise<object>;
    deleteUser(id: number): Promise<object>;
    toggleIsActive(id: number): Promise<object>;
}
