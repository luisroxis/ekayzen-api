import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("budgets")
export class Budget {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  companyId: string;

  @Column()
  typeSale: number;

  @Column()
  users: number;

  @Column()
  taxes: number;

  @Column()
  commission: number;

  @Column()
  amount: number;
  
  @Column()
  status: number; 

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
