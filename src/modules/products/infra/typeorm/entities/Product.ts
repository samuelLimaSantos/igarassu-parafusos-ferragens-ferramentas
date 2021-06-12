import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from '../../../../categories/infra/typeorm/entities/Category';
import { Transaction } from '../../../../transactions/infra/typeorm/entities/Transaction';

@Entity('products')
class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  cod: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  type: string;

  @Column()
  unity: string;

  @Column()
  price_sell: number;

  @Column()
  price_buy: number;

  @Column()
  image_id: number;

  @Column()
  description: string;

  @Column()
  ncm_sh: string;

  @ManyToOne(() => Category, (category) => category.product, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category_id: number;

  @OneToMany(() => Transaction, (transaction) => transaction.user_id)
  transactions: Transaction;

  @CreateDateColumn()
  created_at: Date | string;

  @UpdateDateColumn()
  updated_at: Date | string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Product };
