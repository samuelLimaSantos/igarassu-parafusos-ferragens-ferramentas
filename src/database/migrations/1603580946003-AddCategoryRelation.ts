import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export class AddCategoryRelation1603580946003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'category_id',
      type: 'integer',
      isNullable: false,
    }));

    await queryRunner.createForeignKey('products', new TableForeignKey({
      name: 'CategoryRelation',
      columnNames: ['category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'CategoryRelation');

    await queryRunner.dropColumn('products', 'category_id');
  }
}
