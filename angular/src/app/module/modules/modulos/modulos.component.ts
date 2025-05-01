import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import Swal from 'sweetalert2'

import { Permisos } from '@functions/System'

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [TranslateModule, TablecrudComponent],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.scss'
})
export class ModulosComponent implements OnInit{

  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) { }

  permisos: any[] = []

  async ngOnInit() {
    localStorage.removeItem('modulo')
    localStorage.removeItem('submodulo')
    await this.userService.refreshToken('authadmin');
    const userData = await this.userService.getUser('authadmin');
    const modulo = await this.permisosService.permisos(userData.data.id,'modulos')
    this.permisos = modulo.data
  }

  // inicio datos que envio al componente
  showcampoFiltro = true
  endPoint = 'modulos/getPermisosSobrePadre/0'
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

  verData (_id: string){
    if(_id == '17'){
      localStorage.setItem('submodulo', _id)
      this.router.navigate([`/admin/menu/index-modulos/index-submodulos/index-permisos`]);
    }else{
      localStorage.setItem('modulo', _id)
      this.router.navigate([`/admin/menu/index-modulos/index-submodulos/`]);
    }
  }
  crearData (_id: string){
    console.log("crearData "+_id)
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  eliminarData (_id: string){
    console.log("eliminarData "+_id)
    this.translate.get('pages-usuarios.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('pages-usuarios.Swal.TitleWarnigRevert'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('pages-usuarios.Swal.TitleDelete'),
        cancelButtonText: this.translate.instant('pages-usuarios.Swal.TitleCancel')
      }).then(async (result) => {
        if (result.isConfirmed) {
            if (result.isConfirmed) {
              // await this.principalService.deleteUser(_id)
              await this.someInput.reload()
              Swal.fire({
                title: this.translate.instant('pages-usuarios.Swal.TitleDelete'),
                text: this.translate.instant('pages-usuarios.Swal.TitleRegisterDeleted'),
                icon: "success"
              });
            }
        }
      });
    });
  }

}
