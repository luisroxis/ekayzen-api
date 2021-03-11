import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAddress1615479813572 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "addresses",
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
                name: "zipCode",
                type: "varchar",
              },              
              {
                name: "address",
                type: "varchar",
              },
              {
                name: "district",
                type: "varchar",
              },
              {
                name: "city",
                type: "varchar"
              },
              {
                name: "state",
                type: "varchar"
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
            'addresses',
            new TableForeignKey({
              name: 'AddressCompanyFK',
              columnNames: ['companyId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'companies',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("addresses")
        await queryRunner.dropForeignKey('addresses', 'AddressCompanyFK');
    }

}
