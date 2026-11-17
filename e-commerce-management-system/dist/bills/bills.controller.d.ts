import { BillsService } from './bills.service.js';
import { CreateBillsDto } from './dtos/create-bills.dto.js';
import { UpdateBillsDto } from './dtos/update-bills.dto.js';
export declare class BillsController {
    private readonly billsService;
    constructor(billsService: BillsService);
    createBill(bill: CreateBillsDto): Promise<object>;
    updateBill(id: number, bill: UpdateBillsDto): Promise<object>;
}
