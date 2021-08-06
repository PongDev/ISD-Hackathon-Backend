import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1628257219139 implements MigrationInterface {
    name = 'CreateTable1628257219139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ProjectDatabase\`.\`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(1023) NOT NULL, \`priority\` int NOT NULL, \`member\` json NOT NULL, \`dueDate\` datetime NOT NULL, \`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ProjectDatabase\`.\`task\` (\`projectID\` int NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`detail\` varchar(1023) NOT NULL, \`type\` varchar(255) NOT NULL, \`tagList\` json NOT NULL, \`priority\` int NOT NULL, \`underTaker\` json NOT NULL, \`dueDate\` datetime NOT NULL, \`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ProjectDatabase\`.\`user\` (\`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`displayName\` varchar(255) NOT NULL, PRIMARY KEY (\`email\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`ProjectDatabase\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`ProjectDatabase\`.\`task\``);
        await queryRunner.query(`DROP TABLE \`ProjectDatabase\`.\`project\``);
    }

}
