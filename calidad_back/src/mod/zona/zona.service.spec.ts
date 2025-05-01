import { Test, TestingModule } from '@nestjs/testing';
import { ZonaService } from './zona.service';

describe('ZonaService', () => {
  let service: ZonaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZonaService],
    }).compile();

    service = module.get<ZonaService>(ZonaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
