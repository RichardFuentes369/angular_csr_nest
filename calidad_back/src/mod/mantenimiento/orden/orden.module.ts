import { Module } from '@nestjs/common';
import { OrdenService } from './orden.service';

import { GlobalModule } from '@global/global.module';
import { OrdenController } from './orden.controller';
import { ordenProviders } from './entities/order.provider';
import { ZonaModule } from '@module/zona/zona.module';

@Module({
  imports: [
    GlobalModule,
    ZonaModule
  ],
  controllers: [OrdenController],
  providers: [
    ...ordenProviders,
    OrdenService
  ],
  exports:[
    OrdenService
  ]
})
export class OrdenModule {}
