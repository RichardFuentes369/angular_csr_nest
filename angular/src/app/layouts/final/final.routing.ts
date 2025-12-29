import { Routes } from '@angular/router';

import { finalGuard } from '@guard/roles/final/final.guard';

//componentes
import { MeFinalPageProfileComponent } from '@mod/me/final/pages/profile/profile.component'
import { MeFinalPageSettingsComponent } from '@mod/me/final/pages/settings/settings.component'

export const FinalLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'me/perfil',
    pathMatch: 'full',
  },
  {
    path: 'me/perfil',
    title: 'Perfil',
    component: MeFinalPageProfileComponent,
    canActivate: [
      finalGuard
    ]
  },
  {
    path: 'me/configuracion',
    title: 'Configuracion',
    component: MeFinalPageSettingsComponent,
    canActivate: [
      finalGuard
    ]
  },
];
