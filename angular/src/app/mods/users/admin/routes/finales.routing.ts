import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { TITLE_PATH_FINAL_USERS } from '@mod/users/const/users.const';

// componentes
import { FinalesComponent } from '@mod/users/admin/pages/finales/finales.component';

export const UsuariosFinalesRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_FINAL_USERS,
    data: { breadcrumb: null },
    canActivate: [
      adminGuard
    ],
    component: FinalesComponent,
  },
];
