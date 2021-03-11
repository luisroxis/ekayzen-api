import {Entity, PrimaryColumn} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryColumn()
  readonly id: string;

}
