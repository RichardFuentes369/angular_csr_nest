  import { Routes } from '@angular/router';
  import { adminGuard } from '@guard/roles/admin/admin.guard';

  export const MenuRoutes: Routes = [

    // Modulo Usuarios
    {
      path: 'users',
      title: 'Principal',
      data: { breadcrumb: 'Principal' },
      loadChildren: () => import('@mod/users/admin/routes/index.routing').then(x=>x.UsuariosRoutes),
      canActivate: [
        adminGuard
      ]
    },

    // Modulo Modulos
    {
      path: 'modules',
      title: 'Modulos',
      data: { breadcrumb: 'Modulos' },
      loadChildren: () => import('@mod/modules/admin/routes/modulos.routing').then(x=>x.ModulosRoutes),
      canActivate: [
        adminGuard
      ]
    },
  ];