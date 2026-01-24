
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
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

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private translate: TranslateService,
    private modulosService :ModulosService,
  ){
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

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
      this.optionSelect = 0
      this.model.modulo_padre_id = 0
      this.showSelect = true
      this.showSelectOption = true
      this.hasSubmodule = true
      this.hasPermission = true
    }
    if(localStorage.getItem(STORAGE_KEY_MODULE) && !localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.optionSelect = 2
      this.model.modulo_padre_id = Number(localStorage.getItem(STORAGE_KEY_MODULE))
      this.showSelect = true
      this.showSelectOption = false
      this.hasSubmodule = false
      this.hasPermission = true
    }
    if(localStorage.getItem(STORAGE_KEY_MODULE) && localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.optionSelect = 2
      this.model.modulo_padre_id = Number(localStorage.getItem(STORAGE_KEY_SUBMODULE))
      this.showSelectOption = false
      this.hasSubmodule = false
      this.hasPermission = true
    }
    if(!localStorage.getItem(STORAGE_KEY_MODULE) && localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.optionSelect = 2
      this.model.modulo_padre_id = Number(localStorage.getItem(STORAGE_KEY_SUBMODULE))
      this.showSelectOption = false
      this.showSelect = false
      this.hasSubmodule = false
      this.hasPermission = false
    }
  }

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    const regexPermiso = /^[a-z_]+$/;
    this.validators.nombre = (this.model.nombre.length === 0)
    this.validators.permiso = (this.model.permiso.length === 0 || !regexPermiso.test(this.model.permiso))
    this.validators.descripcion = (this.model.descripcion.length === 0)
    this.validators.selectHas = (this.optionSelect == 0)

    const boton = document.querySelector('.btnSave') as HTMLButtonElement

    if(this.showSelect){
      (!this.validators.nombre && !this.validators.permiso && !this.validators.descripcion && !this.validators.selectHas) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
      return !this.validators.nombre && !this.validators.permiso && !this.validators.descripcion && !this.validators.selectHas
    }else{
      (!this.validators.nombre && !this.validators.permiso && !this.validators.descripcion) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
      return !this.validators.nombre && !this.validators.permiso && !this.validators.descripcion
    }
  }

  async crearModuloPermiso(){

    if(this.isFormValid){
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

}
