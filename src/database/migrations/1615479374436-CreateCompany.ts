import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompany1615479374436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "companies",
            columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true,
              },
              {
                name: "name",
                type: "varchar",
              },              
              {
                name: "email",
                type: "varchar",
              },
              {
                name: "telephone1",
                type: "varchar",
              },
              {
                name: "cnpj",
                type: "varchar",
                isUnique: true,
              },
              {
                name: "size",
                type: "varchar"
              },
              {
                name: "employees",
                type: "int"
              },
              {
                name: "nameResp",
                type: "varchar",
              },              
              {
                name: "emailResp",
                type: "varchar",
              },
              {
                name: "telResp",
                type: "varchar",
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
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("companies")
    }

}
