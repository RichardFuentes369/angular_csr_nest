import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { 
  BREADCRUMB_PATH_ASSIGN_ADMIN_USERS, 
  PATH_ASSIGN_ADMIN_USERS, 
  TITLE_PATH_ADMIN_USERS, 
  TITLE_PATH_ASSIGN_ADMIN_USERS 
} from '@mod/users/const/users.const';

// componentes
import { PrincipalComponent } from '@mod/users/admin/pages/principal/principal.component';
import { AsignarPermisosComponent } from '@mod/users/admin/pages/principal/components/asignar-permisos/asignar-permisos.component';

export const UsuariosAdministradoresRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_USERS,
    data: { breadcrumb: null },
    component: PrincipalComponent,
  },
  {
    path: PATH_ASSIGN_ADMIN_USERS,
    data: { breadcrumb: BREADCRUMB_PATH_ASSIGN_ADMIN_USERS },
    title: TITLE_PATH_ASSIGN_ADMIN_USERS,
    canActivate: [
      adminGuard
    ],
    component: AsignarPermisosComponent,
  },
];
