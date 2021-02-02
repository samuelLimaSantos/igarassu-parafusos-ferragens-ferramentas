import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Category from './Categories';
import Transaction from './Transactions';

@Entity('products')
export default class Products {
  @PrimaryGeneratedColumn('uuid')
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
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.product, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category_id: number;

  @OneToMany(() => Transaction, (transaction) => transaction.user_id)
  transactions: Transaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
