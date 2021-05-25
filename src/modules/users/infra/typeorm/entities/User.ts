import {
  Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Transaction } from '../../../../transactions/model/Transaction';

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string;

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
