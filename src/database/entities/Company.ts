import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity("companies")
export class Company {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telephone1: string;

  @Column()
  cnpj:string;

  @Column()
  size:number;

  @Column()
  employees: number;

  @Column()
  nameResp: string;

  @Column()
  emailResp: string;

  @Column()
  telResp: string;

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
