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

    // Modulo Mantenimiento
    {
      path: 'index-mantenimiento',
      title: 'Mantenimiento',
      data: { breadcrumb: 'Mantenimiento' },
      loadChildren: () => import('@module/mantenimiento/routes/index.routing').then(x=>x.MantenimientoRouter)
    },
    // Modulo Zona Comun
    {
      path: 'index-zona-comun',
      title: 'Zona Comun',
      data: { breadcrumb: 'Zona Comun' },
      loadChildren: () => import('@module/zonaComun/routes/intex.routing').then(x=>x.ZonaComunRouter)
    },
    // Modulo Proveedor
    {
      path: 'index-proveedor',
      title: 'Proveedor',
      data: { breadcrumb: 'Proveedor' },
      loadChildren: () => import('@module/proveedor/routes/index.routing').then(x=>x.ProveedorRouter)
    },
  ];