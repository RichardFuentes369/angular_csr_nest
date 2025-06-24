import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import Swal from 'sweetalert2'

import { Permisos } from '@functions/System'
import { ModulosService } from '../service/modulos.service';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { LoadingComponent } from '@component/globales/loading/loading.component';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [
    TranslateModule, 
    TablecrudComponent,
    ModalBoostrapComponent,
    LoadingComponent
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
      title: 'SubModules',
      data: 'hijos',
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
    if(hasChildren.data[0].hijos == false){
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
    // localStorage.setItem('profile', 'user')
    // this.tamano = "xl"
    // this.scrollable = false
    // this.title = this.translate.instant('pages-usuarios.Title.EditUserFinalWord')
    // this.save = false
    // this.buttonSave = "Guardar"
    // this.edit = true
    // this.buttonEdit = "Editar"
    // this.cancel = true
    // this.buttonCancel = "Cancelar"
    // this.componentePrecargado = "EditarUsuariosComponent"

    // const idButton = document.getElementById('miBoton')
    // if(idButton){
    //   this.router.navigate([], {
    //     queryParams: { rol: 'admin', id: _id },
    //   });
    //   idButton.setAttribute('componente', this.componentePrecargado);
    //   idButton.click()
    // }
    console.log("editarData "+_id)
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

  async refrescarTabla (){
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }


}
