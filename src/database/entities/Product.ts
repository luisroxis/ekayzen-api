import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity("products")
export class Product {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  description: string;

  @Column()
  valuePp: number;

  @Column()
  valueMp: number;

  @Column()
  valueGp: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }

}
