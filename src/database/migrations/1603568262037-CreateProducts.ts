import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1603568262037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'cod',
          type: 'varchar',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'quantity',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'type',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'unity',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'price',
          type: 'decimal(6,2)',
          isNullable: false,
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true,
        },

      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
