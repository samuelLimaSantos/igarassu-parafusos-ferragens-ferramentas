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
import Product from './Products';
import User from './Users';

@Entity('transactions')
export default class Categories {
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
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
