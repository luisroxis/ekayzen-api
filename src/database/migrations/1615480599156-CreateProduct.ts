import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProduct1615480599156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {    
    await queryRunner.createTable(new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "description",
            type: "varchar",
          },              
          {
            name: "valuePp",
            type: "float",
          },
          {
            name: "valueMp",
            type: "float",
          },
          {
            name: "valueGp",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
