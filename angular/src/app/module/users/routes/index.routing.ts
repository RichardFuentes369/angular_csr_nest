import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { IndexComponent } from '../index/index.component';

export const UsuariosRoutes: Routes = [
  {
    path: '',
    title: 'Principal',
    data: { breadcrumb: 'Index' },
    canActivate: [
      adminGuard
    ],
    component: IndexComponent,
  },
  {
    path: 'administradores',
    title: 'Submodulos',
    data: { breadcrumb: 'Administradores' },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./administradores.routing').then(x=>x.UsuariosAdministradoresRoutes)
  },
  {
    path: 'finales',
    title: 'Submodulos',
    data: { breadcrumb: 'Finales' },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./finales.routing').then(x=>x.UsuariosFinalesRoutes)
  },
];
