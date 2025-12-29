import { Routes } from '@angular/router';

import { indexGuard } from '@guard/roles/index/index.guard';

import { MainIndexComponent } from '@mod/main/index/pages/index/index.component'
import { MainLoginComponent } from '@mod/main/index/pages/login/login.component'

export const HomeLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    title: 'Inicio',
    component: MainIndexComponent,
    canActivate: [
      indexGuard
    ]
  },
  {
    path: 'ingreso/final',
    title: 'Ingreso',
    component: MainLoginComponent,
    canActivate: [
      indexGuard
    ]
  },
  {
    path: 'ingreso/admin',
    title: 'Ingreso Administrador',
    component: MainLoginComponent,
    canActivate: [
      indexGuard
    ]
  },
];
