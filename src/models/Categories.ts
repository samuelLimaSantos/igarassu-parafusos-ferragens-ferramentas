import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Product from './Products';

@Entity('categories')
export default class Categories {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Product, (product) => product.category_id)
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
