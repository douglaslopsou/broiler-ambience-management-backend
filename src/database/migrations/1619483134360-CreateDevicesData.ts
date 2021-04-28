import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateDevicesData1619483134360 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'devices_data',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'device_id',
              type: 'uuid',
            },
            {
              name: 'temperature',
              type: 'varchar',
            },
            {
              name: 'umidity',
              type: 'varchar',
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
        }),
      );

      await queryRunner.createForeignKey(
        'devices_data',
        new TableForeignKey({
          name: 'DataDevice',
          columnNames: ['device_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'devices',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('devices_data', 'DataDevice');
      await queryRunner.dropTable('devices_data');
    }

}
