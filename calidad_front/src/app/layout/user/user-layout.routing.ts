import { Routes } from '@angular/router';

import { finalGuard } from '@guard/roles/final/final.guard';

//componentes
import { PerfilComponent } from '@module/basic/principal/user/perfil/perfil.component'
import { ConfiguracionComponent } from '@module/basic/principal/user/configuracion/configuracion.component'

export const UserLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'perfil',
    pathMatch: 'full',
  },
  {
    path: 'perfil',
    title: 'Perfil',
    component: PerfilComponent,
    canActivate: [
      finalGuard
    ]
  },
  {
    path: 'configuracion',
    title: 'Configuracion',
    component: ConfiguracionComponent,
    canActivate: [
      finalGuard
    ]
  },
];
