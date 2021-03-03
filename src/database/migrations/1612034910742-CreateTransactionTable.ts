import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class CreateTransactionTable1612034910742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'transactions',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'product_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'quantity',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'transaction_type',
          type: 'enum',
          enum: ['income', 'outcome'],
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createForeignKey('transactions', new TableForeignKey({
      name: 'TransactionsRelationUserId',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('transactions', new TableForeignKey({
      name: 'TransactionsRelationProductId',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'TransactionsRelationUserId');
    await queryRunner.dropForeignKey('transactions', 'TransactionsRelationProductId');
    await queryRunner.dropTable('transactions');
  }
}
