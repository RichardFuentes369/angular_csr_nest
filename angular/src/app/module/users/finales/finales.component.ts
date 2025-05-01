import { Component, OnInit, ViewChild } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';

import { Permisos } from '@functions/System'
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { FinalService } from './service/final.service';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';

@Component({
  selector: 'app-menu-usuarios-finales',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
    LoadingComponent
  ],
  templateUrl: './finales.component.html',
  styleUrl: './finales.component.scss'
})
export class FinalesComponent implements OnInit{

  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private finalService :FinalService,
    private translate: TranslateService
  ) { }

  permisos: any[] = []

  async ngOnInit() {
    await this.userService.refreshToken('authadmin');
    const userData = await this.userService.getUser('authadmin');
    const modulo = await this.permisosService.permisos(userData.data.id,'finales')
    this.permisos = modulo.data
  }

  // inicio datos que envio al componente
  showcampoFiltro = false
  endPoint = 'user'
  filters = ''
  columnas = [
    {
      title: 'ID',
      data: 'id',
    },
    {
      title: 'Email',
      data: 'email',
    },
    {
      title: 'First name',
      data: 'firstName',
    },
    {
      title: 'Last name',
      data: 'lastName',
    },
    {
      title: 'Status',
      data: 'isActive',
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
  componenteFilter="FiltroUsuariosComponent"

  crearData (_id: string){
    localStorage.setItem('profile', 'user')
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('pages-usuarios.Title.CreateUserFinalWord')
    this.save = true
    this.buttonSave = "Guardar"
    this.edit = false
    this.buttonEdit = "Editar"
    this.cancel = true
    this.buttonCancel = "Cancelar"
    this.cierreModal = "true"
    this.componentePrecargado = "CrearUsuariosComponent"

    const idButton = document.getElementById('miBoton')
    if(idButton){
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
  }

  verData (_id: string){
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('pages-usuarios.Title.SeeUserFinalWord')
    this.save = false
    this.buttonSave = "Guardar"
    this.edit = false
    this.buttonEdit = "Editar"
    this.cancel = true
    this.buttonCancel = "Cancelar"
    this.cierreModal = "true"
    this.componentePrecargado = "VerUsuariosComponent"

    const idButton = document.getElementById('miBoton')
    if(idButton){
      this.router.navigate([], {
        queryParams: { rol: 'admin', id: _id },
      });
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
  }

  editarData (_id: string){
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('pages-usuarios.Title.EditUserFinalWord')
    this.save = false
    this.buttonSave = "Guardar"
    this.edit = false
    this.buttonEdit = "Editar"
    this.cancel = true
    this.buttonCancel = "Cancelar"
    this.componentePrecargado = "EditarUsuariosComponent"

    const idButton = document.getElementById('miBoton')
    if(idButton){
      this.router.navigate([], {
        queryParams: { rol: 'admin', id: _id },
      });
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
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
              await this.finalService.deleteUser(_id)
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

  activarData (_id: string){
    console.log("activarData "+_id)
    this.translate.get('pages-usuarios.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
      Swal.fire({
        title: this.translate.instant('pages-usuarios.Swal.TitleAreYouSure'),
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: this.translate.instant('pages-usuarios.Swal.TitleActived'),
        cancelButtonText: this.translate.instant('pages-usuarios.Swal.TitleCancel'),
        denyButtonText: this.translate.instant('pages-usuarios.Swal.TitleInactived')
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await this.finalService.updateUser(
            {"isActive": true},
            _id
          )
          await this.someInput.reload()
          Swal.fire({
            title: this.translate.instant('pages-usuarios.Swal.TitleActived'),
            text: this.translate.instant('pages-usuarios.Swal.TitleRegisterActived'),
            icon: "success"
          });
        } else if (result.isDenied) {
          await this.finalService.updateUser(
            {"isActive": false},
            _id
          )
          await this.someInput.reload()
          Swal.fire({
            title: this.translate.instant('pages-usuarios.Swal.TitleInactived'),
            text: this.translate.instant('pages-usuarios.Swal.TitleRegisterInactived'),
            icon: "success"
          });
        }
      });
    });
  }

  async filtroData(){
    let filtros = await $('.complementoRuta').val();
    if(typeof filtros === 'string'){
      this.filters = filtros
    }else{
      this.filters = ''
    }
  }


}
