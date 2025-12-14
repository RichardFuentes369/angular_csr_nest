import { Routes } from '@angular/router';

import { adminGuard } from '../../../guards/roles/admin/admin.guard';

// componentes
import { FinalesComponent } from '../finales/finales.component';

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
