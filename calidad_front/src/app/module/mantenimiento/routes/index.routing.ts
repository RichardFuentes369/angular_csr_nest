import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { IndexComponent as ModulosIndex } from '../index/index.component';


export const MantenimientoRouter: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Index' },
    canActivate: [
      adminGuard
    ],
    component: ModulosIndex,
  },
];
