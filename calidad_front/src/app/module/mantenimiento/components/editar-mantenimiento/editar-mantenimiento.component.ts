import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MantenimientoService } from '../../index/service/mantenimiento.service';
import { ocultarModalOscura } from '@functions/System'
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { AuthService } from '@guard/service/auth.service';

import Swal from 'sweetalert2'
import { FormsModule } from '@angular/forms';

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
  selector: 'app-editar-mantenimiento',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, TranslateModule],
  templateUrl: './editar-mantenimiento.component.html',
  styleUrl: './editar-mantenimiento.component.scss'
})
export class EditarMantenimientoComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private mantenimientoService :MantenimientoService,
    private translate: TranslateService
  ) { }

  mantenimiento: any = []
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

  async actualizarOrden(){
    await this.mantenimientoService.updateOrden(this.mantenimiento[0])
    .then(response=>{
      ocultarModalOscura()
      this.translate.get('pages-mantenimiento.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
        localStorage.removeItem('profile')
        Swal.fire({
          title: this.translate.instant('pages-mantenimiento.Swal.TitleUpdate'),
          text: this.translate.instant('pages-mantenimiento.Swal.TitleRegisterUpdated'),
          icon: "success"
        });
      });
    }).catch(err =>{
      console.log(err)
      Swal.fire({
        title: err.response.data.message,
        text: err.response.data.error,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    })

  }
}
