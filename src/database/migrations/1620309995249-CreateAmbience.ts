import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAmbience1620309995249 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'ambience',
          columns: [ 
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'title',
              type: 'varchar',
            },
            {
              name: 'start_at',
              type: 'date',
            },
            {
              name: 'end_at',
              type: 'date',
            },
            {
              name: 'temperature',
              type: 'varchar',
            },
            {
              name: 'umidity',
              type: 'varchar',
            },
          ]
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('ambience');
    }

}
