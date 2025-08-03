import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column({ type: 'bigint' })
  barCode: number;

  @Column()
  reference: string;

  @Column()
  supplier: string;

  @Column()
  size: string;

  @Column()
  categories: string;

  @Column()
  quantity: string;

  @Column()
  owner: string;

  @Column()
  salePrice: string;

  @Column({ type: 'float' })
  purchasePrice: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
