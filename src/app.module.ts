import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DelegationsModule } from './delegations/delegations.module';
import {DbModule} from "./configuration/db-module/db-module.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {Delegation} from "./delegations/model/delegation";
import {DelegationHistory} from "./delegations/model/delegation-history";
import {AuthGuard, KeycloakConnectModule} from "nest-keycloak-connect";
import {APP_GUARD, Reflector} from "@nestjs/core";

@Module({
  imports: [
      DelegationsModule,
      DbModule,
      SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
              dialect: 'postgres',
              host: configService.get<string>('DB_HOST'),
              port: configService.get<number>('DB_PORT'),
              username: configService.get<string>('DB_USERNAME'),
              password: configService.get<string>('DB_PASSWORD'),
              database: configService.get<string>('DB_SCHEMA'),
              models: [Delegation, DelegationHistory]
          })
      }),
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      KeycloakConnectModule.register({
          authServerUrl: 'http://localhost:8080/auth',
          realm: 'master',
          clientId: 'delegations',
          secret: 'o2tiEt3sF6J30OrUY3dE3PCHoUO3tX3m',
      })
  ],
  controllers: [AppController],
  providers: [
      AppService,
      {
          provide: APP_GUARD,
          useClass: AuthGuard,
      },
  ],
  exports: [KeycloakConnectModule]
})
export class AppModule {}
