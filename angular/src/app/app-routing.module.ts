import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@layout/home/home.component'
import { AdminComponent  } from '@layout/admin/admin.component'
import { FinalComponent } from '@layout/final/final.component'

import { adminGuard } from '@guard/roles/admin/admin.guard'
import { finalGuard } from '@guard/roles/final/final.guard';

import { HomeNotFoundComponent  } from '@component/globales/notfound/home/home.component'
import { AdminNotFoundComponent } from '@component/globales/notfound/admin/admin.component'
import { FinalNotFoundComponent } from '@component/globales/notfound/final/final.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@layout/routes/home.routing').then(x=>x.HomeLayoutRoutes)
      },
      {
        path: '**',
        component: HomeNotFoundComponent,
      },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@layout/routes/admin.routing').then(x=>x.AdminLayoutRoutes)
      },
      {
        path: 'mod',
        data: { breadcrumb: 'Menu' },
        loadChildren: () => import('@mod/main/admin/routes/menu.routing').then(x=>x.MenuRoutes)
      },
      {
        path: '**',
        component: AdminNotFoundComponent,
        canActivate: [
          adminGuard
        ]
      },
    ]
  },
  {
    path: 'final',
    data: { breadcrumb: 'Menu' },
    component: FinalComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@layout/routes/final.routing').then(x=>x.FinalLayoutRoutes)
      },
      {
        path: '**',
        component: FinalNotFoundComponent,
        canActivate: [
          finalGuard
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

