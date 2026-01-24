import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '@guard/service/auth.service';
import { ModulosService } from '@mod/modules/admin/service/modulos.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { ActivatedRoute, Router } from '@angular/router';

import { swalert } from '@function/System'
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { PrincipalService } from '../../service/principal.service';

@Component({
  selector: 'app-asignar-permisos',
  standalone: true,
  imports: [
    TranslateModule
],
  templateUrl: './asignar-permisos.component.html',
  styleUrl: './asignar-permisos.component.scss'
})
export class AsignarPermisosComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private userService :AuthService,
    private modulosService :ModulosService,
    private permisosService :PermisosService,
    private principalService :PrincipalService,
  ) { }

  title: any = {}
  permisos: any[] = []

  sinModulo: any[] = [
    'modulos',
  ]

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    let userId = this.route.snapshot.queryParams['id']

    const datUser = await this.principalService.getDataUser(userId)
    const { firstName, lastName } = datUser.data || { firstName: 'xxxx', lastName: 'yyyy' }
    this.title = { user_name: `${firstName} ${lastName}` }

    const modulo = await this.permisosService.listaPermisos(+userId)
    this.permisos = modulo.data
  }

  async asignarPermiso(item: any){
    let userId = this.route.snapshot.queryParams['id']

    let opcion = ''
    if(item.asignado == null || item.asignado == '0'){
      item.asignado = '1'
      opcion = '0'
    }else{
      item.asignado = '0'
      opcion = '1'
    }

    await this.permisosService.asignarPermiso(item.mpm_id, item.mpm_modulo_padre_id, opcion, userId)
    .then(response=>{
      swalert(response.data.title, response.data.message, 'success')
    }).catch(err =>{
      swalert(err.response.data.title, err.response.data.error, 'error')
    })
  }

  toggleCollapse(nombrePermiso: string, isToggle: boolean) {

    const response  = this.permisos.find((e: any) => e.mpm_permiso == nombrePermiso)
    response.mpm_toogle = !isToggle

  }

}
