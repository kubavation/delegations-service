import { Module } from '@nestjs/common';
import { DelegationsController } from './controller/delegations.controller';
import {DelegationsService} from "./service/delegations.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Delegation} from "./model/delegation";
import {DelegationHistory} from "./model/delegation-history";


@Module({
  imports: [SequelizeModule.forFeature([Delegation, DelegationHistory])],
  controllers: [DelegationsController],
  providers: [DelegationsService]
})
export class DelegationsModule {}
