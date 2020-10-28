import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateTimeStampColumns1603889341925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()',
    }));

    await queryRunner.addColumn('products', new TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()',
    }));

    await queryRunner.addColumn('categories', new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()',
    }));

    await queryRunner.addColumn('categories', new TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('categories', 'updated_at');

    await queryRunner.dropColumn('categories', 'created_at');

    await queryRunner.dropColumn('products', 'updated_at');

    await queryRunner.dropColumn('products', 'created_at');
  }
}
