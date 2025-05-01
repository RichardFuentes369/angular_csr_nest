import { Module } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { HistoricoController } from './historico.controller';
import { GlobalModule } from '@global/global.module';
import { ProveedorModule } from '@module/proveedor/proveedor.module';
import { historicoProvider } from './entities/historico.provider';
import { OrdenModule } from '../orden/orden.module';

@Module({
  imports: [
    GlobalModule,
    ProveedorModule,
    OrdenModule
  ],
  controllers: [HistoricoController],
  providers: [
    ...historicoProvider,
    HistoricoService,
  ],
  exports:[
    HistoricoService,
  ]
})
export class HistoricoModule {}
