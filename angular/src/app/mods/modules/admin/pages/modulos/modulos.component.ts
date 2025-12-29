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
    localStorage.removeItem('modulo')
    localStorage.removeItem('submodulo')
    await this.userService.refreshToken('authadmin');
    const userData = await this.userService.getUser('authadmin');

    const submodulo = await this.permisosService.permisoPage(0,'modulos',userData.data.id)
    if (submodulo.data === "") {
      this.router.navigate(['/admin/permiso']);
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
      localStorage.setItem('submodulo', _id)
      this.router.navigate([`/admin/menu/index-modulos/index-permisos/`]);
    }else{
      localStorage.setItem('modulo', _id)
      this.router.navigate([`/admin/menu/index-modulos/index-submodulos/`]);
    }
  }
  
  crearData (_id: string){
    // localStorage.setItem('profile', 'user')
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('pages-modulos.Title.CreateModule')
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
    this.title = this.translate.instant('pages-modulos.Title.EditModule')
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
    this.translate.get('pages-modulos.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('pages-modulos.Swal.TitleWarnigRevert'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('pages-modulos.Swal.TitleDelete'),
        cancelButtonText: this.translate.instant('pages-modulos.Swal.TitleCancel')
      }).then(async (result) => {
        if (result.isConfirmed) {
            let response = await this.modulosService.eliminarPermiso(_id)
            await this.someInput.reload()

            if(response.data.status == 200){
              Swal.fire({
                title: this.translate.instant('pages-modulos.Swal.TitleDelete'),
                text: this.translate.instant('pages-modulos.Swal.TitleRegisterDeleted'),
                icon: "success"
              });
            }
            if(response.data.status == 404){
              Swal.fire({
                title: this.translate.instant('pages-modulos.Swal.TitleDelete'),
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
