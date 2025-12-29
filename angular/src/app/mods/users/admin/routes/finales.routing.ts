import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { FinalesComponent } from '@mod/users/admin/pages/finales/finales.component';

export const UsuariosFinalesRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Lista' },
    title: 'Usuarios',
    canActivate: [
      adminGuard
    ],
    component: FinalesComponent,
  },
];
