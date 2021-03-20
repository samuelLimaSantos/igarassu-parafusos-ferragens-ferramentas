import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/model/Product';

@Entity('categories')
class Category {
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

export { Category };
