import { Routes } from '@angular/router';
import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { PermisosComponent } from '../permisos/permisos.component'

export const PermisosRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Index' },
    canActivate: [
      adminGuard
    ],
    component: PermisosComponent,
  },
];
