import {Sequelize} from "sequelize-typescript";
import {Delegation} from "../../delegations/model/delegation";

export const databaseProvider = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'admin',
                password: 'admin',
                database: 'delegations',
                models: [Delegation]
            });
            await sequelize.sync();
            return sequelize;
        }
    }
];