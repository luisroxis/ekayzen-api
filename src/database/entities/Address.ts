import {Entity, PrimaryColumn} from "typeorm";

@Entity("addresses")
export class Address {
  @PrimaryColumn()
  readonly id: string;

}
