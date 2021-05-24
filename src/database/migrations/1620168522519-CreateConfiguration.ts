import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateConfiguration1620168522519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'configuration',
          columns: [ 
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'range_temperature',
              type: 'varchar',
            },
            {
              name: 'delay_cycle',
              type: 'varchar',
            },
          ]
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('configuration');
    }

}
