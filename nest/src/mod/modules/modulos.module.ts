import { Module } from '@nestjs/common';

import { ModulosService } from './modulos.service';
import { ModulosController } from './modulos.controller';
import { moduloProviders } from './entities/modulos.provider';
import { GlobalModule } from '@global/global.module';
import { asignacionProviders } from '@module/user/admin/permission/asignacion/entities/asignacion.provider';

@Module({
  imports: [
    GlobalModule,
  ],
  controllers: [ModulosController],
  providers: [
    ...moduloProviders,
    ...asignacionProviders,
    ModulosService
  ],
  exports: [
    ModulosService,
  ]
})
export class ModulosModule {}

