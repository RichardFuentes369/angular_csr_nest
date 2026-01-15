import { Component, OnInit, ViewChild } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';

import { FinalService } from './service/final.service';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_PROFILE, WORD_KEY_COMPONENT_GLOBAL } from '@const/app.const';
import { CREAR_USUARIO_COMPONENT, EDITAR_USUARIO_COMPONENT, FILTRO_USUARIO_COMPONENT, STORAGE_KEY_PROFILE_FINAL, VER_USUARIO_COMPONENT } from '@mod/users/const/users.const'
import { LoadingComponent } from '@component/globales/loading/loading.component';

@Component({
  selector: 'app-menu-usuarios-finales',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
  ],
  templateUrl: './finales.component.html',
  styleUrl: './finales.component.scss'
})
export class FinalesComponent implements OnInit{

  // construcator
  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private finalService :FinalService,
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
      render: function (data: any, type: any, row: any) {
        if (type === 'display') {
          if (data === true) {
            return 'Active'
          } else {
            return 'Inactive'
          }
        }
        return data;
      }
    }
  ]
  permisosAcciones = this.permisos
  // fin datos que envio al componente tabla

  cargarTabla = true;

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

  // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const submodulo = await this.permisosService.permisoPage(1,'finales',userData.data.id)
    if (submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    } 

    const permisos = await this.permisosService.permisos(userData.data.id,'finales')
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
    localStorage.setItem(STORAGE_KEY_PROFILE, STORAGE_KEY_PROFILE_FINAL)
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-users.CREATE_FINAL_TITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_USUARIO_COMPONENT

    const idButton = document.getElementById('miBoton')
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async verData (_id: string){
    const response = await this.finalService.getDataUser(_id)
    const { firstName, lastName } = response.data || { firstName: 'xxxxxxx', lastName: 'yyyyyyy' }
    
    this.translate.get('mod-users.SEE_FINAL_TITLE', { "user_name": firstName + ' ' + lastName }).subscribe((res: string) => {this.title = res});
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

    const idButton = document.getElementById('miBoton')
    if(idButton){
      this.router.navigate([], {
        queryParams: { rol: 'admin', id: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async editarData (_id: string){
    localStorage.setItem(STORAGE_KEY_PROFILE, STORAGE_KEY_PROFILE_FINAL)

    const response = await this.finalService.getDataUser(_id)
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

    const idButton = document.getElementById('miBoton')
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
    console.log("eliminarData "+_id)

    const response = await this.finalService.getDataUser(_id[0])
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
            await this.finalService.deleteUser(_id)
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
    console.log("activarData "+_id)

    let opcionesSelect = {
      0: this.translate.instant('mod-users.WORD_INACTIVED'),
      1: this.translate.instant('mod-users.WORD_ACTIVED'),
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
          await this.finalService.updatestatusUser(_id, result.value)
          await this.someInput.reload()
          Swal.fire({
            title: this.translate.instant('mod-users.SWAL_UPDATED'),
            text: this.translate.instant('mod-users.SWAL_UPDATED_RECORD'),
            icon: "success"
          });
        }
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

  async refrescarTabla (){
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }

}
