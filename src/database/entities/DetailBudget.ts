import {Entity, PrimaryColumn} from "typeorm";

@Entity("details-budgets")
export class DetailBudget {
  @PrimaryColumn()
  readonly id: string;

}
