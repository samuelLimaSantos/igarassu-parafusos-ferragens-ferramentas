import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DropTransactionColumnInProductsTable1612239733998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'transaction_type');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'transaction_type',
      type: 'varchar',
      isNullable: true,
    }));
  }
}
