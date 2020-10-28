import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateTransactionTypeColumn1603890739650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'transaction_type',
      type: 'varchar',
      isNullable: false,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'transaction_type');
  }
}
