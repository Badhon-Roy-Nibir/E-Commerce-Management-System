import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bills } from './entities/bills.entity.js';
import { Repository } from 'typeorm';
import { CreateBillsDto } from './dtos/create-bills.dto.js';
import { UpdateBillsDto } from './dtos/update-bills.dto.js';

@Injectable()
export class BillsService {
    constructor(@InjectRepository(Bills) private readonly billRepo: Repository<Bills>){}

    async createBill(bill: CreateBillsDto): Promise<object>{
        try{
            const orderId = await this.billRepo.findOne({
                where: {
                    orderId: bill.orderId
                }
            });
            if(orderId){
                return {
                    message: "Invalid bill! OrderId already exists"
                }
            }
            let total = bill.subtotal - (bill.subtotal*(bill.discount/100)) + bill.shippingFee + (bill.subtotal*(bill.tax/100));
            bill.total = total;
            const newBill = await this.billRepo.create(bill);
            await this.billRepo.save(newBill);

            return {
                message: "Bill Generated!",
                data: newBill
            }
        }catch{
            throw new BadRequestException("Bills not found!");
        }

    }
    async updateBill(id: number, bill: UpdateBillsDto): Promise<object>{
        try{
            const updateBill = await this.billRepo.findOne({
                where: {
                    billId: id,
                }
            });
            if(!updateBill){
                return {
                    message: `Bill with id ${id} doesnot exisits`
                }
            }
            
            if(updateBill.paymentStatus != "Paid" && bill.paymentStatus ==="Paid"){
                updateBill.paidAt = new Date();
            }
            Object.assign(updateBill, bill);
            await this.billRepo.save(updateBill);
            return{
                message: `Bill with id ${id} updated`,
                data: updateBill
            }
        }catch{
            throw new BadRequestException("Bill not found!");
        }
    }
}
