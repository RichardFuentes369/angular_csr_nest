import { Routes } from '@angular/router';

import { adminGuard } from '../../../guards/roles/admin/admin.guard';

// componentes
import { PrincipalComponent } from '../principal/principal.component';
import { AsignarPermisosComponent } from '../components/asignar-permisos/asignar-permisos.component';

export const UsuariosAdministradoresRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Lista' },
    title: 'Administradores',
    canActivate: [
      adminGuard
    ],
    component: PrincipalComponent,
  },
  {
    path: 'asignar-administrador',
    data: { breadcrumb: 'Asignar' },
    title: 'Asignar usuario administrador',
    canActivate: [
      adminGuard
    ],
    component: AsignarPermisosComponent,
  },
];
