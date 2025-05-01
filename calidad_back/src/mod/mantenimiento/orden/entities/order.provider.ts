import { DataSource } from 'typeorm';
import { Orden } from './orden.entity';

export const ordenProviders = [
  {
    provide: 'ORDEN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Orden),
    inject: ['DATA_SOURCE'],
  },
];