import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MantenimientoService } from '../../index/service/mantenimiento.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { AuthService } from '@guard/service/auth.service';

interface MantenimientoInterface {
  'id': number,
  'serial': string,
  'descripcion': string,
  'precio': string,
  'fecha_mantenimiento': string,
  'fecha_creacion': string,
  'fecha_actualizacion': string,
  'estado': string,
  'zona_id': {
    'nombre': string,
    'descripcion': string,
    'ubicacion': string
  },
}

@Component({
  selector: 'app-ver-mantenimiento',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './ver-mantenimiento.component.html',
  styleUrl: './ver-mantenimiento.component.scss'
})
export class VerMantenimientoComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private mantenimientoService :MantenimientoService
  ) { }

  mantenimiento: MantenimientoInterface[] = []
  permisos: any[] = []
  mantenimientoReal: any
  
  async ngOnInit() {
    await this.userService.refreshToken('authadmin');

    this.mantenimientoReal = await this.mantenimientoService.getDataOrden(
      this.route.snapshot.queryParams?.['id']
    )

    this.mantenimiento.push(this.mantenimientoReal.data)
  }


  tienePermiso(nombre: string): boolean {
    return this.permisos.some((permiso) => permiso === nombre);
  }

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }
}
