import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateBudget1615481908168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "budgets",
            columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true,
              },
              {
                name: "companyId",
                type: "uuid"
              },
              {
                name: "typefold",
                type: "int",
              },              
              {
                name: "users",
                type: "float",
              },
              {
                name: "taxes",
                type: "int",
              },
              {
                name: "commission",
                type: "int"
              },
              {
                name: "amount",
                type: "float"
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
            'budgets',
            new TableForeignKey({
              name: 'BudgetCompanyFK',
              columnNames: ['companyId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'companies',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("budgets")
      await queryRunner.dropForeignKey('budgets', 'BudgetCompanyFK');
    }

}
