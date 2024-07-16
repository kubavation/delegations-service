import { Module } from '@nestjs/common';
import { DelegationsController } from './controller/delegations.controller';

@Module({
  controllers: [DelegationsController]
})
export class DelegationsModule {}
