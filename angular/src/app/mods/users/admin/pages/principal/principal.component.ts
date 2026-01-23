
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
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_PROFILE, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { CREAR_USUARIO_COMPONENT, EDITAR_USUARIO_COMPONENT, FILTRO_USUARIO_COMPONENT, MOD_USER_PAGE_ADMIN_ASSIGMENT, STORAGE_KEY_PROFILE_ADMIN, VER_USUARIO_COMPONENT } from '@mod/users/const/users.const'
import { LoadingComponent } from '@component/globales/loading/loading.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    LoadingComponent,
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
  buttonSearch = this.translate.instant('mod-users.BUTTON_SEARCH')
  iconFilter="fa fa-filter"
  componenteFilter=FILTRO_USUARIO_COMPONENT
  // fin datos envio al filtro

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'admin'
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-users.COLUMN_ID'),
      data: 'id',
    },
    {
      title: this.translate.instant('mod-users.COLUMN_EMAIL'),
      data: 'email',
    },
    {
      title: this.translate.instant('mod-users.COLUMN_NAMES'),
      data: 'firstName',
    },
    {
      title: this.translate.instant('mod-users.COLUMN_LASTNAME'),
      data: 'lastName',
    },
    {
      title: this.translate.instant('mod-users.COLUMN_STATUS'),
      data: 'isActive',
      render: (data: any, type: any) => {
        if (type === 'display') {
          const statusKey = data ? this.translate.instant('mod-users.WORD_ACTIVED') : this.translate.instant('mod-users.WORD_INACTIVED');
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
  buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal

  cargarTabla = true;

  // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const submodulo = await this.permisosService.permisoPage(1,'administradores',userData.data.id)
    if (submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    } 

    const permisos = await this.permisosService.permisos(userData.data.id,'administradores')
    this.permisos = permisos.data
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')
    sessionStorage.removeItem('isActive')

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarTabla = false;
      timer(200).subscribe(() => {
        this.listar(); 
        this.cargarTabla = true;
      });
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
        title: this.translate.instant('mod-users.COLUMN_ID'),
        data: 'id',
      },
      {
        title: this.translate.instant('mod-users.COLUMN_EMAIL'),
        data: 'email',
      },
      {
        title: this.translate.instant('mod-users.COLUMN_NAMES'),
        data: 'firstName',
      },
      {
        title: this.translate.instant('mod-users.COLUMN_LASTNAME'),
        data: 'lastName',
      },
      {
        title: this.translate.instant('mod-users.COLUMN_STATUS'),
        data: 'isActive',
        render: (data: any, type: any) => {
          if (type === 'display') {
            const statusKey = data ? this.translate.instant('mod-users.WORD_ACTIVED') : this.translate.instant('mod-users.WORD_INACTIVED');
            return this.translate.instant(statusKey);
          }
          return data;
        }
      }
    ]
  }

  crearData (_id: string){
    localStorage.setItem(STORAGE_KEY_PROFILE, STORAGE_KEY_PROFILE_ADMIN)
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-users.CREATE_ADMIN_TITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_USUARIO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async verData (_id: string){
    const response = await this.principalService.getDataUser(_id)
    const { firstName, lastName } = response.data || { firstName: 'xxxxxxx', lastName: 'yyyyyyy' }
    
    this.translate.get('mod-users.SEE_ADMIN_TITLE', { "user_name": firstName + ' ' + lastName }).subscribe((res: string) => {this.title = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_USUARIO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { rol: 'admin', id: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async editarData (_id: string){
    localStorage.setItem(STORAGE_KEY_PROFILE, STORAGE_KEY_PROFILE_ADMIN)

    const response = await this.principalService.getDataUser(_id)
    const { firstName, lastName } = response.data || { firstName: 'xxxxxxx', lastName: 'yyyyyyy' }
    
    this.translate.get('mod-users.SWAL_ARE_YOU_SURE_UPDATE_USER', { "user_name": firstName + ' ' + lastName }).subscribe((res: string) => {this.title = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
    this.componentePrecargado = EDITAR_USUARIO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { rol: 'admin', id: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  async eliminarData (_id: string[]){
    const response = await this.principalService.getDataUser(_id[0])
    const { firstName, lastName } = response.data || { firstName: 'xxxxxxx', lastName: 'yyyyyyy' }
    const name_user = (_id.length === 1) ? firstName+" "+lastName : "("+_id.length+")"
    const count_users = (_id.length === 1) ? 'el' : 'los'
    const plural = (_id.length === 1) ? '' : 's'
    
    this.translate.get('mod-users.SWAL_ARE_YOU_SURE_DELETE_USER',{ "art_the": count_users, "plural": plural, "user_name": name_user}).subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('mod-users.SWAL_WARNING_REVERSE_CHANGE'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('mod-users.SWAL_BUTTON_DELETE'),
        cancelButtonText: this.translate.instant('mod-users.SWAL_BUTTON_CANCEL')
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (result.isConfirmed) {
            await this.principalService.deleteUser(_id)
            await this.someInput.reload()
            Swal.fire({
              title: this.translate.instant('mod-users.SWAL_DELETED'),
              text: this.translate.instant('mod-users.SWAL_DELETED_RECORD'),
              icon: "success"
            });
          }
       }
      });
    });
  }
  
  activarData (_id: string[]){
    let opcionesSelect = {
      1: this.translate.instant('mod-users.WORD_ACTIVED'),
      0: this.translate.instant('mod-users.WORD_INACTIVED'),
    };

    Swal.fire({
        title: this.translate.instant('mod-users.LABEL_USER_STATUS'),
        input: 'select',
        inputOptions: opcionesSelect,
        inputPlaceholder: this.translate.instant('mod-users.SELECT_STATUS_USER_SELECT_OPTION'),
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value === '') {
                    resolve(this.translate.instant('mod-users.SWAL_WORD_ONE_OPTION_SELECTION'));
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
            title: this.translate.instant('mod-users.SWAL_UPDATED'),
            text: this.translate.instant('mod-users.SWAL_UPDATED_RECORD'),
            icon: "success"
          });
        }
    });
  }

  asignarData (data: { id: string, ctrlKey: boolean }){
    const url = `${MOD_USER_PAGE_ADMIN_ASSIGMENT}?id=${data.id}`;
    if (data.ctrlKey) {
      window.open(url, '_blank');
    } else {
      this.router.navigate([MOD_USER_PAGE_ADMIN_ASSIGMENT], { queryParams: { id: data.id } });
    }
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
