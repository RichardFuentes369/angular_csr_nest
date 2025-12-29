import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { IndexComponent } from '@mod/users/admin/pages/index/index.component';

export const UsuariosRoutes: Routes = [
  {
    path: '',
    title: 'Principal',
    data: { breadcrumb: 'Index' },
    component: IndexComponent,
  },
  {
    path: 'administradores',
    title: 'Administradores',
    data: { breadcrumb: 'Administradores' },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./administradores.routing').then(x=>x.UsuariosAdministradoresRoutes)
  },
  {
    path: 'finales',
    title: 'Finales',
    data: { breadcrumb: 'Finales' },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./finales.routing').then(x=>x.UsuariosFinalesRoutes)
  },
];
