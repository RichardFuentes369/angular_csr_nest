  import { Routes } from '@angular/router';

  export const MenuRoutes: Routes = [
    // Modulo Usuarios
    {
      path: 'index-usuarios',
      title: 'Principal',
      data: { breadcrumb: 'Principal' },
      loadChildren: () => import('@module/users/routes/index.routing').then(x=>x.UsuariosRoutes)
    },

    // Modulo Modulos
    {
      path: 'index-modulos',
      title: 'Modulos',
      data: { breadcrumb: 'Modulos' },
      loadChildren: () => import('@module/modules/routes/modulos.routing').then(x=>x.ModulosRoutes)
    },
  ];