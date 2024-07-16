import {Sequelize} from "sequelize-typescript";
import {Delegation} from "../../delegations/model/delegation";
import {ConfigService} from "@nestjs/config";

export const databaseProvider = [
    {
        provide: 'SEQUELIZE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_SCHEMA'),
                models: [Delegation]
            });
            await sequelize.sync();
            return sequelize;
        }
    }
];