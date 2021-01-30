import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Product from './Products';
import User from './Users';

@Entity('transactions')
export default class Categories {
  @PrimaryGeneratedColumn('uuid')
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
}
