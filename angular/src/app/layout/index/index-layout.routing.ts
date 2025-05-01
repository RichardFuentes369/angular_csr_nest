import { Routes } from '@angular/router';

import { indexGuard } from '@guard/roles/index/index.guard';

import { InicioComponent } from '@module/basic/index/inicio/inicio.component'
// import { IndexComponent as IndexPublicaciones } from '@module/posts/index/index.component'
import { IngresoComponent } from '@module/basic/index/ingreso/ingreso.component'

export const IndexLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    title: 'Inicio',
    component: InicioComponent,
    canActivate: [
      indexGuard
    ]
  },
  // {
  //   path: 'publicaciones',
  //   title: 'Publicaciones',
  //   component: IndexPublicaciones,
  //   canActivate: [
  //     indexGuard
  //   ]
  // },
  {
    path: 'ingreso/user',
    title: 'Ingreso',
    component: IngresoComponent,
    canActivate: [
      indexGuard
    ]
  },
  {
    path: 'ingreso/admin',
    title: 'Ingreso Administrador',
    component: IngresoComponent,
    canActivate: [
      indexGuard
    ]
  },
];
