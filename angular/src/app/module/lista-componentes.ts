import { CrearUsuariosComponent } from './users/components/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from "./users/components/editar-usuarios/editar-usuarios.component";
import { VerUsuariosComponent } from "./users/components/ver-usuarios/ver-usuarios.component";
import { FiltroUsuariosComponent } from './users/components/filtro/filtro.component';

import { CrearModuloPermisoComponent } from './modules/components/crear-modulo-permiso/crear-modulo-permiso.component';
import { EditarModuloPermisoComponent } from './modules/components/editar-modulo-permiso/editar-modulo-permiso.component';
import { VerModuloPermisoComponent } from './modules/components/ver-modulo-permiso/ver-modulo-permiso.component';

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
    
    // modulos permisos
    {
      name: 'CrearModuloPermisoComponent',
      componente: CrearModuloPermisoComponent  
    },
    {
      name: 'EditarModuloPermisoComponent',
      componente: EditarModuloPermisoComponent  
    },
    {
      name: 'VerModuloPermisoComponent',
      componente: VerModuloPermisoComponent  
    },

  ];

  obtenerComponentePorNombre(nombre: string) {
    return this.componentes.find(comp => comp.name === nombre);
  }
}
