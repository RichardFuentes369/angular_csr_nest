import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { proveedorProviders } from './entities/proveedor.provider';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';

@Module({
  imports: [GlobalModule],
  controllers: [ProveedorController],
  providers: [
    ...proveedorProviders,
    ProveedorService
  ],
  exports: [
    ProveedorService
  ]
})
export class ProveedorModule {}
