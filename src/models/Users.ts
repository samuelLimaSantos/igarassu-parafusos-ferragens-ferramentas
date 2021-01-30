import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import Transaction from './Transactions';

@Entity('users')
export default class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.user_id)
  transactions: Transaction;
}
