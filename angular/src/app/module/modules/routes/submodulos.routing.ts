import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { SubmodulosComponent as SubmoduloIndex } from '../submodulos/submodulos.component';

export const SubModulosRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Index' },
    canActivate: [
      adminGuard
    ],
    component: SubmoduloIndex,
  },
  {
    path: 'index-permisos',
    title: 'Permisos',
    canActivate: [
      adminGuard
    ],
    data: { breadcrumb: 'Permisos' },
    loadChildren: () => import('./permisos.routing').then(x=>x.PermisosRoutes)
  },
];
