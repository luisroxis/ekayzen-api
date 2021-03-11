import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateDetailBudget1615481916275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "details-budgets",
            columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true,
              },
              {
                name: "budgetId",
                type: "uuid"
              },
              {
                name: "productId",
                type: "uuid"
              },
              {
                name: "value",
                type: "int",
              }, 
              {
                name: "created_at",
                type: "timestamp with time zone",
                default: "now()"
              },
              {
                name: "updated_at",
                type: "timestamp with time zone",
                default: "now()"
              }
            ]
          }))
          await queryRunner.createForeignKey(
            'details-budgets',
            new TableForeignKey({
              name: 'BudgetFK',
              columnNames: ['budgetId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'budgets',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
          await queryRunner.createForeignKey(
            'details-budgets',
            new TableForeignKey({
              name: 'ProductFK',
              columnNames: ['productId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'products',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("details-budgets")
        await queryRunner.dropForeignKey('details-budgets', 'BudgetFK');
        await queryRunner.dropForeignKey('details-budgets', 'ProductFK');
    }

}
