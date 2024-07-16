import { Test, TestingModule } from '@nestjs/testing';
import { DelegationsController } from './delegations.controller';

describe('DelegationsController', () => {
  let controller: DelegationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DelegationsController],
    }).compile();

    controller = module.get<DelegationsController>(DelegationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
