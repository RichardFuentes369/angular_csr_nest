import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { zonaProviders } from './entities/zona.provider';
import { ZonaService } from './zona.service';
import { ZonaController } from './zona.controller';

@Module({
  imports: [GlobalModule],
  controllers: [ZonaController],
  providers: [
    ...zonaProviders,
    ZonaService
  ],
  exports: [
    ZonaService
  ]
})
export class ZonaModule {}
