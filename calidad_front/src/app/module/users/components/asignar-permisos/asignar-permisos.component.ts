import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '@guard/service/auth.service';
import { ModulosService } from '@module/modules/service/modulos.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { swalert } from '@functions/System'

@Component({
  selector: 'app-asignar-permisos',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './asignar-permisos.component.html',
  styleUrl: './asignar-permisos.component.scss'
})
export class AsignarPermisosComponent implements OnInit{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService :AuthService,
    private modulosService :ModulosService,
    private PermisosService :PermisosService,
    private translate: TranslateService
  ) { }

  permisos: any[] = []

  sinModulo: any[] = [
    'modulos',
    'mantenimiento',
    'zona_comun',
    'proveedor'
  ]

  async ngOnInit() {
    await this.userService.refreshToken('authadmin');
    const userData = await this.userService.getUser('authadmin');
    let userId = this.route.snapshot.queryParams['id']
    const modulo = await this.modulosService.listaPermisos(+userId)
    this.permisos = modulo.data
  }

  async actualizarPermiso(item: any){
    let userId = this.route.snapshot.queryParams['id']

    let opcion = ''
    if(item.asignado == null || item.asignado == '0'){
      item.asignado = '1'
      opcion = '0'
    }else{
      item.asignado = '0'
      opcion = '1'
    }

    await this.modulosService.actualizarPermiso(item.mpm_id, item.mpm_modulo_padre_id, opcion, userId)
    .then(response=>{
      swalert(response.data.title, response.data.message, 'success')
    }).catch(err =>{
      swalert(err.response.data.title, err.response.data.error, 'error')
    })
  }

  toggleCollapse(nombrePermiso: string, isToggle: boolean) {

    const response  = this.permisos.find((e: any) => e.mpm_nombre_permiso == nombrePermiso)
    response.mpm_toogle = !isToggle

  }

}
