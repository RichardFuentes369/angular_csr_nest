
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { ocultarModalOscura } from '@function/System'
import { STORAGE_KEY_MODULE, STORAGE_KEY_SUBMODULE } from '@mod/modules/const/modules.const';
import { ModulosService } from '../../service/modulos.service';

interface PermisoInterface {
  'id': number,
  'modulo_padre_id': number,
  'nombre': string,
  'permiso': string,
  'descripcion': string,
  'tiene_submodulos': boolean,
  'tiene_permisos': boolean,
}

@Component({
  selector: 'app-editar-modulo-permiso',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './editar-modulo-permiso.component.html',
  styleUrl: './editar-modulo-permiso.component.scss'
})
export class EditarModuloPermisoComponent implements OnInit{

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modulosService: ModulosService,
    private translate: TranslateService
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
    id: 0,
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

  permiso: PermisoInterface[] = []
  permisoReal: any

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    this.validators.nombre = (this.model.nombre.length === 0)
    this.validators.permiso = (this.model.permiso.length === 0)
    this.validators.descripcion = (this.model.descripcion.length === 0)
    this.validators.selectHas = (this.optionSelect == 0)

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement

    if(this.showSelect){
      (!this.validators.nombre && !this.validators.permiso && !this.validators.descripcion && !this.validators.selectHas) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
      return !this.validators.nombre && !this.validators.permiso && !this.validators.descripcion && !this.validators.selectHas
    }else{
      (!this.validators.nombre && !this.validators.permiso && !this.validators.descripcion) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
      return !this.validators.nombre && !this.validators.permiso && !this.validators.descripcion
    }
  }

  async ngOnInit() {
    if(!localStorage.getItem(STORAGE_KEY_MODULE) && !localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.showSelect = true
      this.showSelectOption = true
      this.hasSubmodule = true
      this.hasPermission = true
    }
    if(localStorage.getItem(STORAGE_KEY_MODULE) && !localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.showSelect = true
      this.showSelectOption = false
      this.hasSubmodule = false
      this.hasPermission = true
    }
    if(localStorage.getItem(STORAGE_KEY_MODULE) && localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.showSelectOption = false
      this.hasSubmodule = false
      this.hasPermission = true
    }
    if(!localStorage.getItem(STORAGE_KEY_MODULE) && localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.showSelectOption = false
      this.showSelect = false
      this.hasSubmodule = false
      this.hasPermission = false
    }

    this.permisoReal = await this.modulosService.getHasSubmodule(
      this.route.snapshot.queryParams?.['id']
    )

    this.permiso.push(this.permisoReal.data[0])
    
    this.optionSelect = (this.permisoReal.data[0].tiene_permisos == true) ? 2 : 1
    this.model.id = this.route.snapshot.queryParams?.['id']
    this.model.nombre = this.permisoReal.data[0].nombre
    this.model.permiso = this.permisoReal.data[0].permiso
    this.model.descripcion = this.permisoReal.data[0].descripcion
    this.model.tiene_permisos = this.permisoReal.data[0].tiene_permisos
    this.model.tiene_submodulos = this.permisoReal.data[0].tiene_submodulos
  }

  async actualizarData(){
    if(this.isFormValid){

      this.model.tiene_submodulos= (this.optionSelect == 1) ? true : false
      this.model.tiene_permisos = (this.optionSelect == 2) ? true : false

      let endPoint = this.modulosService
      await endPoint.actualizarPermiso(
        {
          nombre: this.model.nombre,
          permiso: this.model.permiso,
          descripcion: this.model.descripcion,
          tiene_submodulos: this.model.tiene_submodulos,
          tiene_permisos: this.model.tiene_permisos
        },
        this.model.id
      ).then((response) =>{
        ocultarModalOscura()
        this.translate.get('mod-modules.SWAL_ARE_YOU_SURE').subscribe((translatedTitle: string) => {
          Swal.fire({
            title: this.translate.instant('mod-modules.SWAL_UPDATED'),
            text: this.translate.instant('mod-modules.SWAL_UPDATED_RECORD'),
            icon: "success"
          });
        });
      }).catch(async error => {
        this.ngOnInit()
        if(typeof(error.response.data.message) == 'string'){
          Swal.fire(error.response.data.message);
        }else{
          Swal.fire(error.response.data.message[0]);
        }
      })
    }
  }

}
