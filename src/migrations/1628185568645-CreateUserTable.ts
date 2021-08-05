import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1628185568645 implements MigrationInterface {
    name = 'CreateUserTable1628185568645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ProjectDatabase\`.\`user\` (\`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`username\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`ProjectDatabase\`.\`user\``);
    }

}
