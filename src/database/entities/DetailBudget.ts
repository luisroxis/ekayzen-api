import {
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToMany, 
  ManyToOne, 
  PrimaryColumn, 
  UpdateDateColumn
} from "typeorm";
import {v4 as uuid } from 'uuid'
import { Budget } from "./Budget";
import { Product } from "./Product";

@Entity("details-budgets")
export class DetailBudget {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  budgetId: string;

  @ManyToOne(()=> Budget)
  @JoinColumn({name: 'budgetId'})
  budget: Budget  

  @Column()
  productId: string;

  @ManyToMany(()=> Product)
  @JoinColumn({name: 'productId'})
  product: Product

  @Column()
  value: number;

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
