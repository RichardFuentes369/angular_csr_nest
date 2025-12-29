import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { ModulosComponent as ModulosIndex } from '@mod/modules/admin/pages/modulos/modulos.component';

export const ModulosRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: null },
    canActivate: [
      adminGuard
    ],
    component: ModulosIndex,
  },
  {
    path: 'submodules',
    title: 'Submodulos',
    canActivate: [
      adminGuard
    ],
    data: { breadcrumb: 'Submodulos' },
    loadChildren: () => import('./submodulos.routing').then(x=>x.SubModulosRoutes)
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
