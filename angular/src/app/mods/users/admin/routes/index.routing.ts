import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { 
  BREADCRUMB_PATH_ADMIN_USERS,
  BREADCRUMB_PATH_FINAL_USERS,
  PATH_ADMIN_USERS, 
  PATH_FINAL_USERS, 
  TITLE_PATH_ADMIN_USERS, 
  TITLE_PATH_FINAL_USERS, 
  TITLE_PATH_USERS_INDEX 
} from '@mod/users/const/users.const';

// componentes
import { IndexComponent } from '@mod/users/admin/pages/index/index.component';

export const UsuariosRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_USERS_INDEX,
    data: { breadcrumb: null },
    component: IndexComponent,
  },
  {
    path: PATH_ADMIN_USERS,
    title: TITLE_PATH_ADMIN_USERS,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_USERS },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./administradores.routing').then(x=>x.UsuariosAdministradoresRoutes)
  },
  {
    path: PATH_FINAL_USERS,
    title: TITLE_PATH_FINAL_USERS,
    data: { breadcrumb: BREADCRUMB_PATH_FINAL_USERS },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./finales.routing').then(x=>x.UsuariosFinalesRoutes)
  },
];
