import { DataSource } from 'typeorm';
import { Zona } from './zona.entity';

export const zonaProviders = [
  {
    provide: 'ZONA_SOCIAL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Zona),
    inject: ['DATA_SOURCE'],
  },
];