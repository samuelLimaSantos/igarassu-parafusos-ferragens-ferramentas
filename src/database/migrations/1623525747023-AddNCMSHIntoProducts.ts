import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNCMSHIntoProducts1623525747023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'ncm_sh',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'ncm_sh');
  }
}
