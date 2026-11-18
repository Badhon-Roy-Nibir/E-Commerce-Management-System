import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Bills } from '../../bills/entities/bills.entity.js';
import type { Relation } from 'typeorm';

@Entity('payments')
export class Payment {

  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column({ type: 'decimal',
    precision: 10, scale: 2 })
    amount: number;

  @Column({ length: 50 })
    provider: string;

  @Column({ 
    unique: true, 
    nullable: true })
    providerReference: string;

  @Column({ 
    type: 'timestamp', 
    nullable: true })
    paidDate?: Date;

  @ManyToOne(() => Bills,(bill) => bill.payment,
        {
            nullable: false,
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn({
        name: 'billId'
    })
    bill: Relation<Bills>;

  @CreateDateColumn()
   createdDate: Date;

  @UpdateDateColumn()
   updatedDate: Date;
   
@DeleteDateColumn({ 
    nullable: true })
  deletedDate: Date;
}