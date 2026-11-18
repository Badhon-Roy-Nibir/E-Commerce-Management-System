import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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

  @Column()
   billId: number;

  @CreateDateColumn()
   createdDate: Date;

  @UpdateDateColumn()
   updatedDate: Date;
   
@DeleteDateColumn({ 
    nullable: true })
  deletedDate: Date;
}