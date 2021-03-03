import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreatePriceSellAndImageFlag1614736604656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('products', [
      new TableColumn({
        name: 'price_sell',
        type: 'decimal(6,2)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'price_buy',
        type: 'decimal(6,2)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'image_id',
        type: 'integer',
        isNullable: true,
      }),
    ]);

    await queryRunner.dropColumn('products', 'price');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'price',
      type: 'decimal(6,2)',
      isNullable: true,
    }));

    await queryRunner.dropColumns('products', [
      new TableColumn({
        name: 'price_sell',
        type: 'decimal(6,2)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'price_buy',
        type: 'decimal(6,2)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'image_id',
        type: 'integer',
        isNullable: true,
      }),
    ]);
  }
}
