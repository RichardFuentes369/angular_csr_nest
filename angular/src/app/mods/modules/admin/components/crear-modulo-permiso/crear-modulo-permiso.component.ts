
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { ModulosService } from '@mod/modules/admin/service/modulos.service';
import { STORAGE_KEY_MODULE, STORAGE_KEY_SUBMODULE } from '@mod/modules/const/modules.const';

@Component({
  selector: 'app-crear-modulo-permiso',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './crear-modulo-permiso.component.html',
  styleUrl: './crear-modulo-permiso.component.scss'
})
export class CrearModuloPermisoComponent implements OnInit{

  constructor(
    private router: Router,
    private translate: TranslateService,
    private modulosService :ModulosService,
  ){}

  showSelect = false
  showSelectOption = false
  hasSubmodule = false
  hasPermission = false

  optionSelect = 0

  model = {
    modulo_padre_id: 0,
    nombre: '',
    permiso: '',
    descripcion: '',
    tiene_submodulos: false,
    tiene_permisos: false
  }

  validators = {
    nombre: false,
    permiso: false,
    descripcion: false,
    selectHas: false
  }

  async ngOnInit() {
    if(!localStorage.getItem(STORAGE_KEY_MODULE) && !localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.model.modulo_padre_id = 0
      this.showSelect = true
      this.showSelectOption = true
      this.hasSubmodule = true
      this.hasPermission = true
    }
    if(localStorage.getItem(STORAGE_KEY_MODULE) && !localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.model.modulo_padre_id = Number(localStorage.getItem(STORAGE_KEY_MODULE))
      this.showSelect = true
      this.showSelectOption = false
      this.hasSubmodule = false
      this.hasPermission = true
    }
    if(localStorage.getItem(STORAGE_KEY_MODULE) && localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.model.modulo_padre_id = Number(localStorage.getItem(STORAGE_KEY_SUBMODULE))
      this.showSelectOption = false
      this.hasSubmodule = false
      this.hasPermission = true
    }
    if(!localStorage.getItem(STORAGE_KEY_MODULE) && localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.model.modulo_padre_id = Number(localStorage.getItem(STORAGE_KEY_SUBMODULE))
      this.showSelectOption = false
      this.showSelect = false
      this.hasSubmodule = false
      this.hasPermission = false
    }
  }

  async crearModuloPermiso(){

    this.validators.nombre = (this.model.nombre === '') ? true : false
    this.validators.permiso = (this.model.permiso === '') ? true : false
    this.validators.descripcion = (this.model.descripcion === '') ? true : false
    this.validators.selectHas = (this.optionSelect === 0 && this.showSelect === true) ? true : false

    if(this.validators.nombre || this.validators.permiso || this.validators.descripcion || this.validators.selectHas){
      return
    }
    
    this.model.tiene_submodulos = (this.optionSelect == 1) ? true : false
    this.model.tiene_permisos = (this.optionSelect == 2) ? true : false
    
    const response = await this.modulosService.crearPermiso(this.model)
    if(response.data.status == 404){
      ocultarModalOscura()
      Swal.fire({
        title: response.data.message,
        text: response.data.error,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
    if(response.data.status == 200){
      ocultarModalOscura()
      this.translate.get('mod-modules.SWAL_ARE_YOU_SURE').subscribe((translatedTitle: string) => {
        Swal.fire({
          title: this.translate.instant('mod-modules.SWAL_CREATED'),
          text: this.translate.instant('mod-modules.SWAL_CREATED_RECORD'),
          icon: "success"
        });
      });
    }
  }

}
