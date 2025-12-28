import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard'

//componentes
import { PerfilComponent } from '@module/basic/principal/admin/perfil/perfil.component'
import { ConfiguracionComponent } from '@module/basic/principal/admin/configuracion/configuracion.component'
import { MenuComponent } from '@module/basic/principal/admin/menu/menu.component'
import { NotfoundComponent } from '@module/basic/principal/admin/notfound/notfound.component';


export const AdminLayoutRoutes: Routes = [

  /*
  * Template
  */
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
      adminGuard
    ]
  },
  {
    path: 'configuracion',
    title: 'Configuracion',
    component: ConfiguracionComponent,
    canActivate: [
      adminGuard
    ]
  },  
  {
    path: 'notfound',
    title: 'NotFound',
    component: NotfoundComponent,
    canActivate: [
      adminGuard
    ]
  },

  // Modulos

  // >> Menu
  {
    path: 'menu',
    title: 'Menu',
    component: MenuComponent,
    canActivate: [
      adminGuard
    ],
  },

];
