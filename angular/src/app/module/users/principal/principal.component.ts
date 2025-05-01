import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PipesModule } from '@pipe/pipes.module';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';

import Swal from 'sweetalert2'

import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { LoadingComponent } from '@component/globales/loading/loading.component';

import { PrincipalService } from './service/principal.service';
import { SearchComponent } from '@component/globales/search/search.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
    LoadingComponent
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit{

  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private principalService :PrincipalService,
    private translate: TranslateService
  ) { }

  permisos: any[] = []

  async ngOnInit() {
    await this.userService.refreshToken('authadmin');
    const userData = await this.userService.getUser('authadmin');
    const modulo = await this.permisosService.permisos(userData.data.id,'administradores')
    this.permisos = modulo.data
  }

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'admin'
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
  // fin datos que envio al componente tabla

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
    localStorage.setItem('profile', 'admin')
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('pages-usuarios.Title.CreateAdminWord')
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
    this.title = this.translate.instant('pages-usuarios.Title.SeeAdminWord')
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
        queryParams: { rol: 'user', id: _id },
      });
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
  }

  editarData (_id: string){
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('pages-usuarios.Title.EditAdminWord')
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
        queryParams: { rol: 'user', id: _id },
      });
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
  }

  asignarData (_id: string){
    console.log("asignarData "+_id)
    this.router.navigate(['/admin/menu/index-usuarios/administradores/asignar-administrador/'], { queryParams: { id: _id } });
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
              await this.principalService.deleteUser(_id)
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
          await this.principalService.updateUser(
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
          await this.principalService.updateUser(
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
