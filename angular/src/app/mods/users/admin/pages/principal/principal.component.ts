
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';

import Swal from 'sweetalert2'

import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';

import { PrincipalService } from './service/principal.service';
import { SearchComponent } from '@component/globales/search/search.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit, OnDestroy{

  // construcator
  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private principalService :PrincipalService,
    private translate: TranslateService
  ) { }

  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = "Buscar"
  iconFilter="fa fa-filter"
  componenteFilter="FiltroUsuariosComponent"
  // fin datos envio al filtro

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'admin'
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-users.Column.Id'),
      data: 'id',
    },
    {
      title: this.translate.instant('mod-users.Column.Email'),
      data: 'email',
    },
    {
      title: this.translate.instant('mod-users.Column.Names'),
      data: 'firstName',
    },
    {
      title: this.translate.instant('mod-users.Column.Surnames'),
      data: 'lastName',
    },
    {
      title: this.translate.instant('mod-users.Column.Status'),
      data: 'isActive',
      render: (data: any, type: any) => {
        if (type === 'display') {
          const statusKey = data ? this.translate.instant('mod-users.Column.Actived') : this.translate.instant('mod-users.Column.Inactived');
          return this.translate.instant(statusKey);
        }
        return data;
      }
    }
  ];
  permisosAcciones = this.permisos
  // fin datos que envio al componente tabla

  // inicio datos envio al modal
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
  // fin datos envio al modal

  // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken('authadmin');
    const userData = await this.userService.getUser('authadmin');

    const submodulo = await this.permisosService.permisoPage(1,'administradores',userData.data.id)
    console.log(submodulo)
    if (submodulo.data === "") {
      this.router.navigate(['/admin/permiso']);
    } 

    const permisos = await this.permisosService.permisos(userData.data.id,'administradores')
    this.permisos = permisos.data
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')
    sessionStorage.removeItem('isActive')

    this.langSub = this.translate.onLangChange.subscribe(() => {
      setTimeout(() => {
        this.listar();
      }, 100); 
    });

  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }

  // metodos Componente
  listar(){
    this.columnas = [
      {
        title: this.translate.instant('mod-users.Column.Id'),
        data: 'id',
      },
      {
        title: this.translate.instant('mod-users.Column.Email'),
        data: 'email',
      },
      {
        title: this.translate.instant('mod-users.Column.Names'),
        data: 'firstName',
      },
      {
        title: this.translate.instant('mod-users.Column.Surnames'),
        data: 'lastName',
      },
      {
        title: this.translate.instant('mod-users.Column.Status'),
        data: 'isActive',
        render: (data: any, type: any) => {
          if (type === 'display') {
            const statusKey = data ? this.translate.instant('mod-users.Column.Actived') : this.translate.instant('mod-users.Column.Inactived');
            return this.translate.instant(statusKey);
          }
          return data;
        }
      }
    ]
  }

  crearData (_id: string){
    localStorage.setItem('profile', 'admin')
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-users.Title.CreateAdminWord')
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
    this.title = this.translate.instant('mod-users.Title.SeeAdminWord')
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
    localStorage.setItem('profile', 'admin')
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-users.Title.EditAdminWord')
    this.save = false
    this.buttonSave = "Guardar"
    this.edit = true
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

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  eliminarData (_id: string[]){
    console.log("eliminarData "+_id)
    this.translate.get('mod-users.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('mod-users.Swal.TitleWarnigRevert'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('mod-users.Swal.TitleDelete'),
        cancelButtonText: this.translate.instant('mod-users.Swal.TitleCancel')
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (result.isConfirmed) {
            await this.principalService.deleteUser(_id)
            await this.someInput.reload()
            Swal.fire({
              title: this.translate.instant('mod-users.Swal.TitleDelete'),
              text: this.translate.instant('mod-users.Swal.TitleRegisterDeleted'),
              icon: "success"
            });
          }
       }
      });
    });
  }
  
  activarData (_id: string[]){
    console.log("activarData "+_id)

    let opcionesSelect = {
      0: this.translate.instant('mod-users.Swal.TitleInactived'),
      1: this.translate.instant('mod-users.Swal.TitleActived'),
    };

    Swal.fire({
        title: this.translate.instant('mod-users.Label.statusUser'),
        input: 'select',
        inputOptions: opcionesSelect,
        inputPlaceholder: this.translate.instant('mod-users.Placeholder.select'),
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value === '') {
                    resolve(this.translate.instant('mod-users.Swal.MsjErrorSelected'));
                } else {
                    resolve();
                }
            });
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
          await this.principalService.updatestatusUser(_id, result.value)
          await this.someInput.reload()
          Swal.fire({
            title: this.translate.instant('mod-users.Swal.TitleUpdate'),
            text: this.translate.instant('mod-users.Swal.TitleRegisterUpdated'),
            icon: "success"
          });
        }
    });
  }

  asignarData (_id: string){
    console.log("asignarData "+_id)
    this.router.navigate(['/admin/mod/users/administradores/asignar-administrador/'], { queryParams: { id: _id } });
  }

  async filtroData(){
    let filtros = await $('.complementoRuta').val();
    if(typeof filtros === 'string'){
      this.filters = filtros
    }
  }

  async refrescarTabla (){
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }

}
