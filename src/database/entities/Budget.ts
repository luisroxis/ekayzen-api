import {Entity, PrimaryColumn} from "typeorm";

@Entity("budgets")
export class Budget {
  @PrimaryColumn()
  readonly id: string;

}
