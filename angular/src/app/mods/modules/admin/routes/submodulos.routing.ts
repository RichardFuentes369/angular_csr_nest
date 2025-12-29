import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { SubmodulosComponent as SubmoduloIndex } from '@mod/modules/admin/pages/submodulos/submodulos.component';

export const SubModulosRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: null },
    canActivate: [
      adminGuard
    ],
    component: SubmoduloIndex,
  },
  {
    path: 'permissions',
    title: 'Permisos',
    canActivate: [
      adminGuard
    ],
    data: { breadcrumb: 'Permisos' },
    loadChildren: () => import('./permisos.routing').then(x=>x.PermisosRoutes)
  },
];
