import { Bills } from './entities/bills.entity.js';
import { Repository } from 'typeorm';
import { CreateBillsDto } from './dtos/create-bills.dto.js';
import { UpdateBillsDto } from './dtos/update-bills.dto.js';
export declare class BillsService {
    private readonly billRepo;
    constructor(billRepo: Repository<Bills>);
    createBill(bill: CreateBillsDto): Promise<object>;
    updateBill(id: number, bill: UpdateBillsDto): Promise<object>;
}
