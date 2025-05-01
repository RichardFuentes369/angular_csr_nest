import { DataSource } from 'typeorm';
import { Proveedor } from './proveedor.entity';

export const proveedorProviders = [
  {
    provide: 'PROVEEDOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Proveedor),
    inject: ['DATA_SOURCE'],
  },
];