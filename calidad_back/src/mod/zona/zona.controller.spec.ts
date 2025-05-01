import { Test, TestingModule } from '@nestjs/testing';
import { ZonaController } from './zona.controller';
import { ZonaService } from './zona.service';

describe('ZonaController', () => {
  let controller: ZonaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZonaController],
      providers: [ZonaService],
    }).compile();

    controller = module.get<ZonaController>(ZonaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
