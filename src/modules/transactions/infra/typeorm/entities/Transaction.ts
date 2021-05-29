import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from '../../../../products/infra/typeorm/entities/Product';
import { User } from '../../../../users/infra/typeorm/entities/User';

@Entity('transactions')
class Transaction {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product_id: string;

  @Column()
  quantity: number;

  @Column()
  transaction_type: 'income' | 'outcome'

  @CreateDateColumn()
  created_at: Date | string;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Transaction };
