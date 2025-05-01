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

import { ZonaComunService } from './service/zona-comun.service';
import { SearchComponent } from '@component/globales/search/search.component';


@Component({
  selector: 'app-zonas-comunes-index',
  standalone: true,
  imports: [
    CommonModule, 
    PipesModule, 
    TranslateModule,
    SearchComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
    LoadingComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{

  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private zonaComunService :ZonaComunService,
    private translate: TranslateService
  ) { }

  permisos: any[] = []

  async ngOnInit() {
    await this.userService.refreshToken('authadmin');
    const userData = await this.userService.getUser('authadmin');
    const modulo = await this.permisosService.permisos(userData.data.id,'zona_comun')
    this.permisos = modulo.data
  }

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'zona'
  filters = ''
  columnas = [
    {
      title: 'ID',
      data: 'id',
    },
    {
      title: 'Name',
      data: 'nombre',
    },
    {
      title: 'Description',
      data: 'descripcion',
    },
    {
      title: 'Location',
      data: 'ubicacion',
    },
    {
      title: 'Created At',
      data: 'fecha_creacion',
    },
    {
      title: 'Updated At',
      data: 'fecha_actualizacion',
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
  componenteFilter="FiltroZonaComponent"

  crearData (_id: string){
    localStorage.setItem('profile', 'admin')
    this.tamano = "xl"
    this.scrollable = false
    this.title = "Crear zona comun"
    this.save = true
    this.buttonSave = "Guardar"
    this.edit = false
    this.buttonEdit = "Editar"
    this.cancel = true
    this.buttonCancel = "Cancelar"
    this.cierreModal = "true"
    this.componentePrecargado = "CrearZonaComponent"

    const idButton = document.getElementById('miBoton')
    if(idButton){
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
  }

  verData (_id: string){
    this.tamano = "xl"
    this.scrollable = false
    this.title = "Ver zona comun"
    this.save = false
    this.buttonSave = "Guardar"
    this.edit = false
    this.buttonEdit = "Editar"
    this.cancel = true
    this.buttonCancel = "Cancelar"
    this.cierreModal = "true"
    this.componentePrecargado = "VerZonaComponent"

    const idButton = document.getElementById('miBoton')
    if(idButton){
      this.router.navigate([], {
        queryParams: { id: _id },
      });
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
  }

  editarData (_id: string){
    this.tamano = "xl"
    this.scrollable = false
    this.title = "Editar zona comun"
    this.save = false
    this.buttonSave = "Guardar"
    this.edit = false
    this.buttonEdit = "Editar"
    this.cancel = true
    this.buttonCancel = "Cancelar"
    this.componentePrecargado = "EditarZonaComponent"

    const idButton = document.getElementById('miBoton')
    if(idButton){
      this.router.navigate([], {
        queryParams: { id: _id },
      });
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  eliminarData (_id: string){
    console.log("eliminarData "+_id)
    this.translate.get('pages-zonaComun.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('pages-zonaComun.Swal.TitleWarnigRevert'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('pages-zonaComun.Swal.TitleDelete'),
        cancelButtonText: this.translate.instant('pages-zonaComun.Swal.TitleCancel')
      }).then(async (result) => {
        if (result.isConfirmed) {
            if (result.isConfirmed) {
              await this.zonaComunService.deleteZona(_id)
              await this.someInput.reload()
              Swal.fire({
                title: this.translate.instant('pages-zonaComun.Swal.TitleDelete'),
                text: this.translate.instant('pages-zonaComun.Swal.TitleRegisterDeleted'),
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

  async filtroData(){
    let filtros = await $('.complementoRuta').val();
    if(typeof filtros === 'string'){
      this.filters = filtros
    }else{
      this.filters = ''
    }
  }
}
