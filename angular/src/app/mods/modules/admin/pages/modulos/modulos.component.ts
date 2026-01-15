import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import Swal from 'sweetalert2'
import { ModulosService } from '@mod/modules/admin/service/modulos.service';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, WORD_KEY_COMPONENT_GLOBAL } from '@const/app.const';
import { CREAR_MODULO_PERMISO_COMPONENT, EDITAR_MODULO_PERMISO_COMPONENT, MOD_MODULES_PAGE_PERMISSIONS, MOD_MODULES_PAGE_SUBMODULES, STORAGE_KEY_MODULE, STORAGE_KEY_SUBMODULE } from '@mod/modules/const/modules.const';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [
    TranslateModule, 
    TablecrudComponent,
    LoadingComponent,
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

  private langSub: Subscription | undefined;
  permisos: any[] = []

  async ngOnInit() {
    localStorage.removeItem(STORAGE_KEY_MODULE)
    localStorage.removeItem(STORAGE_KEY_SUBMODULE)
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const submodulo = await this.permisosService.permisoPage(0,'modulos',userData.data.id)
    if (submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    } 

    const modulo = await this.permisosService.permisos(userData.data.id,'modulos')
    this.permisos = modulo.data

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarTabla = false;
      timer(200).subscribe(() => {
        this.listar(); 
        this.cargarTabla = true;
      });
    });
  }

  // inicio datos que envio al componente
  showcampoFiltro = true
  endPoint = 'modulos/getPermisosSobrePadre/0'
  columnas = [
    {
      title: this.translate.instant('mod-modules.COLUMN_MODULE_NAME'),
      data: 'nombre',
    },
    {
      title: this.translate.instant('mod-modules.COLUMN_PERMISSION_NICKNAME'),
      data: 'permiso',
    },
    {
      title: this.translate.instant('mod-modules.COLUMN_DESCRIPTION'),
      data: 'descripcion',
    },
    {
      title: this.translate.instant('mod-modules.COLUMN_HAS_SUBMODULE'),
      data: 'tiene_submodulos',
      render: (data: any, type: any, row: any) => {
        if (type === 'display') {
          return data ? this.translate.instant('mod-modules.WORD_YES') : this.translate.instant('mod-modules.WORD_NO');
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
  buttonSave = this.translate.instant('mod-modules.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-modules.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-modules.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""

  cargarTabla = true;
  
  search = true
  buttonSearch = this.translate.instant('mod-modules.BUTTON_EDIT_PERMISSION_MODULE4')
  iconFilter="fa fa-filter"

  listar(){
    this.columnas = [
      {
        title: this.translate.instant('mod-modules.COLUMN_MODULE_NAME'),
        data: 'nombre',
      },
      {
        title: this.translate.instant('mod-modules.COLUMN_PERMISSION_NICKNAME'),
        data: 'permiso',
      },
      {
        title: this.translate.instant('mod-modules.COLUMN_DESCRIPTION'),
        data: 'descripcion',
      },
      {
        title: this.translate.instant('mod-modules.COLUMN_HAS_SUBMODULE'),
        data: 'tiene_submodulos',
        render: (data: any, type: any, row: any) => {
          if (type === 'display') {
            return data ? this.translate.instant('mod-modules.WORD_YES') : this.translate.instant('mod-modules.WORD_NO');
          }
          return data;
        }
      } 
    ]
  }

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
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-modules.CREATE_MODULE_TITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-modules.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-modules.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-modules.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_MODULO_PERMISO_COMPONENT

    const idButton = document.getElementById('miBoton')
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }
  
  async editarData (_id: string){
    const response = await this.modulosService.getHasSubmodule(+_id)
    const { nombre } = response.data?.[0] || { nombre: 'xxxxxxx' }
    this.translate.get('mod-modules.EDIT_MODULE_TITLE', { "module_name": nombre }).subscribe((res: string) => {this.title = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-modules.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-modules.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-modules.BUTTON_CANCEL')
    this.componentePrecargado = EDITAR_MODULO_PERMISO_COMPONENT

    const idButton = document.getElementById('miBoton')
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  async eliminarData (_id: string[]){
    const response = await this.modulosService.getHasSubmodule(+_id)
    const { nombre } = response.data?.[0] || { nombre: 'xxxxxxx' }
    this.translate.get('mod-modules.SWAL_ARE_YOU_SURE', { "permission_name": nombre }).subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('mod-modules.SWAL_WARNING_REVERSE_CHANGE'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('mod-modules.SWAL_BUTTON_DELETE'),
        cancelButtonText: this.translate.instant('mod-modules.SWAL_BUTTON_CANCEL')
      }).then(async (result) => {
        if (result.isConfirmed) {
            let response = await this.modulosService.eliminarPermiso(_id)
            await this.someInput.reload()

            if(response.data.status == 200){
              Swal.fire({
                title: this.translate.instant('mod-modules.SWAL_DELETED'),
                text: this.translate.instant('mod-modules.SWAL_DELETED_RECORD'),
                icon: "success"
              });
            }
            if(response.data.status == 404){
              Swal.fire({
                title: this.translate.instant('mod-modules.SWAL_DELETED'),
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
