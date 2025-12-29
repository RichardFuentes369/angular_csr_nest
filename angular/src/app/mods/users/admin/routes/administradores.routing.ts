import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { PrincipalComponent } from '@mod/users/admin/pages/principal/principal.component';
import { AsignarPermisosComponent } from '@mod/users/admin/pages/principal/components/asignar-permisos/asignar-permisos.component';

export const UsuariosAdministradoresRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Lista' },
    title: 'Administradores',
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
