import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from 'uuid';
import { Company } from "./Company";

@Entity("addresses")
export class Address {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  companyId: string;

  @OneToOne(()=> Company)
  @JoinColumn({name: 'companyId'})
  company: Company  

  @Column()
  zipCode: string;

  @Column()
  address: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

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
