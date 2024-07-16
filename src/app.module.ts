import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DelegationsModule } from './delegations/delegations.module';
import {DbModule} from "./configuration/db-module/db-module.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      DelegationsModule,
      DbModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
