import { DataSource } from 'typeorm';
import { Historico } from './historico.entity';

export const historicoProvider = [
  {
    provide: 'HISTORICO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Historico),
    inject: ['DATA_SOURCE'],
  },
];