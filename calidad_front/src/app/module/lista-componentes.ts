import { CrearUsuariosComponent } from './users/components/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from "./users/components/editar-usuarios/editar-usuarios.component";
import { VerUsuariosComponent } from "./users/components/ver-usuarios/ver-usuarios.component";
import { FiltroUsuariosComponent } from './users/components/filtro/filtro.component';

import { CrearZonaComponent } from './zonaComun/components/crear-zona/crear-zona.component';
import { VerZonaComponent } from './zonaComun/components/ver-zona/ver-zona.component';
import { EditarZonaComponent } from './zonaComun/components/editar-zona/editar-zona.component';
import { FiltroZonaComponent } from './zonaComun/components/filtro/filtro.component';

import { CrearProveedorComponent } from './proveedor/components/crear-proveedor/crear-proveedor.component';
import { VerProveedorComponent } from './proveedor/components/ver-proveedor/ver-proveedor.component';
import { EditarProveedorComponent } from './proveedor/components/editar-proveedor/editar-proveedor.component';
import { FiltroProveedorComponent } from './proveedor/components/filtro/filtro.component';

import { CrearMantenimientoComponent } from './mantenimiento/components/crear-mantenimiento/crear-mantenimiento.component';
import { EditarMantenimientoComponent } from './mantenimiento/components/editar-mantenimiento/editar-mantenimiento.component';
import { VerMantenimientoComponent } from './mantenimiento/components/ver-mantenimiento/ver-mantenimiento.component';
import { FiltroMantenimientoComponent } from './mantenimiento/components/filtro/filtro.component';
import { HistoricoComponent } from './mantenimiento/historico/historico.component';

export class ListaComponentes {

  /*
  * Componentes forzados a cargar en los modals
  */
  componentes: any[] = [
    // usuarios
    {
      name: 'CrearUsuariosComponent',
      componente: CrearUsuariosComponent
    },
    {
      name: 'VerUsuariosComponent',
      componente: VerUsuariosComponent
    },
    {
      name: 'EditarUsuariosComponent',
      componente: EditarUsuariosComponent
    },
    {
      name: 'FiltroUsuariosComponent',
      componente: FiltroUsuariosComponent
    },

    // zona comun
    {
      name: 'CrearZonaComponent',
      componente: CrearZonaComponent
    },
    {
      name: 'VerZonaComponent',
      componente: VerZonaComponent
    },
    {
      name: 'EditarZonaComponent',
      componente: EditarZonaComponent
    },
    {
      name: 'FiltroZonaComponent',
      componente: FiltroZonaComponent
    },

    // proveedores
    {
      name: 'CrearProveedorComponent',
      componente: CrearProveedorComponent
    },
    {
      name: 'VerProveedorComponent',
      componente: VerProveedorComponent
    },
    {
      name: 'EditarProveedorComponent',
      componente: EditarProveedorComponent
    },
    {
      name: 'FiltroProveedorComponent',
      componente: FiltroProveedorComponent
    },

    // mantenimiento
    {
      name: 'CrearMantenimientoComponent',
      componente: CrearMantenimientoComponent
    },
    {
      name: 'EditarMantenimientoComponent',
      componente: EditarMantenimientoComponent
    },
    {
      name: 'VerMantenimientoComponent',
      componente: VerMantenimientoComponent
    },
    {
      name: 'FiltroMantenimientoComponent',
      componente: FiltroMantenimientoComponent
    },

    // historico
    {
      name: 'HistoricoComponent',
      componente: HistoricoComponent
    },
    
  ];

  obtenerComponentePorNombre(nombre: string) {
    return this.componentes.find(comp => comp.name === nombre);
  }
}
