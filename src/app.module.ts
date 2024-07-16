import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DelegationsModule } from './delegations/delegations.module';
import {DbModule} from "./configuration/db-module/db-module.module";

@Module({
  imports: [DelegationsModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
