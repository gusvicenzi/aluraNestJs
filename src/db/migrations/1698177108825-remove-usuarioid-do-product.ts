import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveUsuarioidDoProduct1698177108825
  implements MigrationInterface
{
  name = 'RemoveUsuarioidDoProduct1698177108825'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "usuario_id"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "usuario_id" character varying(100)`
    )
  }
}
