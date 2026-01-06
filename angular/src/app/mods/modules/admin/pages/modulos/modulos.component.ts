import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import Swal from 'sweetalert2'

import { Permisos } from '@function/System'
import { ModulosService } from '@mod/modules/admin/service/modulos.service';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { MOD_USER_PAGE_PERMISO, STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { MOD_MODULES_PAGE_PERMISSIONS, MOD_MODULES_PAGE_SUBMODULES, STORAGE_KEY_MODULE, STORAGE_KEY_SUBMODULE } from '@mod/modules/const/modules.const';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [
    TranslateModule, 
    TablecrudComponent,
    ModalBoostrapComponent
  ],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.scss'
})
export class ModulosComponent implements OnInit{

  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private modulosService :ModulosService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) { }

  permisos: any[] = []

  async ngOnInit() {
    localStorage.removeItem(STORAGE_KEY_MODULE)
    localStorage.removeItem(STORAGE_KEY_SUBMODULE)
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const submodulo = await this.permisosService.permisoPage(0,'modulos',userData.data.id)
    if (submodulo.data === "") {
      this.router.navigate([MOD_USER_PAGE_PERMISO]);
    } 

    const modulo = await this.permisosService.permisos(userData.data.id,'modulos')
    this.permisos = modulo.data
  }

  // inicio datos que envio al componente
  showcampoFiltro = true
  endPoint = 'modulos/getPermisosSobrePadre/0'
  columnas = [
     {
      title: 'Permission name',
      data: 'nombre',
    },
    {
      title: 'Permission',
      data: 'permiso',
    },
    {
      title: 'Description',
      data: 'descripcion',
    },
    {
      title: 'Submodules',
      data: 'tiene_submodulos',
      render: function (data: any, type: any, row: any) {
        if (type === 'display') {
          if (data === true) {
            return 'Yes'
          } else {
            return 'No'
          }
        }
        return data;
      }
    }
  ]
  permisosAcciones = this.permisos
  // fin datos que envio al componente

  tamano = ""
  scrollable = false
  title = ""
  save = true
  buttonSave = "Guardar"
  edit = true
  buttonEdit = "Editar"
  cancel = true
  buttonCancel = "Cancelar"
  cierreModal = "true"
  componentePrecargado = ""
  
  search = true
  buttonSearch = "Buscar"
  iconFilter="fa fa-filter"

  async verData (_id: string){
    const hasChildren = await this.modulosService.getHasSubmodule(+_id)
    if(hasChildren.data[0].tiene_submodulos == false){
      localStorage.setItem(STORAGE_KEY_SUBMODULE, _id)
      this.router.navigate([MOD_MODULES_PAGE_PERMISSIONS]);
    }else{
      localStorage.setItem(STORAGE_KEY_MODULE, _id)
      this.router.navigate([MOD_MODULES_PAGE_SUBMODULES]);
    }
  }
  
  crearData (_id: string){
    // localStorage.setItem('profile', 'user')
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-modules.Title.CreateModule')
    this.save = true
    this.buttonSave = "Guardar"
    this.edit = false
    this.buttonEdit = "Editar"
    this.cancel = true
    this.buttonCancel = "Cancelar"
    this.cierreModal = "true"
    this.componentePrecargado = "CrearModuloPermisoComponent"

    const idButton = document.getElementById('miBoton')
    if(idButton){
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
  }
  editarData (_id: string){
    console.log(_id)
    // localStorage.setItem('profile', 'user')
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-modules.Title.EditModule')
    this.save = false
    this.buttonSave = "Guardar"
    this.edit = true
    this.buttonEdit = "Editar"
    this.cancel = true
    this.buttonCancel = "Cancelar"
    this.componentePrecargado = "EditarModuloPermisoComponent"

    const idButton = document.getElementById('miBoton')
    if(idButton){
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  eliminarData (_id: string[]){
    this.translate.get('mod-modules.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('mod-modules.Swal.TitleWarnigRevert'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('mod-modules.Swal.TitleDelete'),
        cancelButtonText: this.translate.instant('mod-modules.Swal.TitleCancel')
      }).then(async (result) => {
        if (result.isConfirmed) {
            let response = await this.modulosService.eliminarPermiso(_id)
            await this.someInput.reload()

            if(response.data.status == 200){
              Swal.fire({
                title: this.translate.instant('mod-modules.Swal.TitleDelete'),
                text: this.translate.instant('mod-modules.Swal.TitleRegisterDeleted'),
                icon: "success"
              });
            }
            if(response.data.status == 404){
              Swal.fire({
                title: this.translate.instant('mod-modules.Swal.TitleDelete'),
                text: response.data.message,
                icon: "error"
              });
            }
        }
      });
    });
  }

  async refrescarTabla (){
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }


}
