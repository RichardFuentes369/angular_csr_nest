import { Component, OnInit } from '@angular/core';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';

import { Permisos } from '@functions/System'
@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [TranslateModule, TablecrudComponent],
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.scss'
})
export class PermisosComponent implements OnInit{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private translate: TranslateService
  ) { }

  permisos: any[] = []
  moduloPadre: any = 0

  async ngOnInit() {
    this.moduloPadre = localStorage.getItem('submodulo')

    if(!this.moduloPadre){
      this.router.navigate([`/admin/menu/index-modulos`]);
    }

    await this.userService.refreshToken('authadmin');
    const userData = await this.userService.getUser('authadmin');
    const modulo = await this.permisosService.permisos(userData.data.id,'modulos')

    for (const permiso of modulo.data) {
      if(permiso.permiso_nombre_permiso != 'ver'){
        this.permisos.push(permiso)
      }
    }

  }

  // inicio datos que envio al componente
  showcampoFiltro = true
  endPoint = `modulos/getPermisosSobrePadre/${localStorage.getItem('submodulo')}`
  columnas = [
    {
      title: 'ID',
      data: 'id',
    },
    {
      title: 'First name',
      data: 'nombre_permiso',
    }
  ]
  permisosAcciones = this.permisos
  // fin datos que envio al componente

}
