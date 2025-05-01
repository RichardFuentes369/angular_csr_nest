import { Test, TestingModule } from '@nestjs/testing';
import { OrdenController } from './orden.controller';
import { OrdenService } from './orden.service';

describe('OrdenController', () => {
  let controller: OrdenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenController],
      providers: [OrdenService],
    }).compile();

    controller = module.get<OrdenController>(OrdenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
