
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
  'firstName': string,
  'lastName': string,
  'email': string,
  'password': string,
  'isActive': number,
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
  mostrarCheck = false
  
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

  permiso: PermisoInterface[] = []
  permisoReal: any

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.validators.nombre = (this.model.nombre.length === 0)
    this.validators.permiso = (this.model.permiso.length === 0)
    this.validators.descripcion = (this.model.descripcion.length === 0 || !regexEmail.test(this.model.descripcion))
    this.validators.selectHas = (this.optionSelect == 0)

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (!this.validators.nombre && !this.validators.permiso && !this.validators.descripcion && !this.validators.selectHas) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.nombre && !this.validators.permiso && !this.validators.descripcion && !this.validators.selectHas
  }

  async ngOnInit() {
    if(localStorage.getItem(STORAGE_KEY_MODULE) && localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.mostrarCheck = false
    }
    if(localStorage.getItem(STORAGE_KEY_MODULE) && !localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.mostrarCheck = false
    }
    if(!localStorage.getItem(STORAGE_KEY_MODULE) && !localStorage.getItem(STORAGE_KEY_SUBMODULE)){
      this.mostrarCheck = true
    }

    this.permiso.push(this.permisoReal.data)
    this.model.nombre = this.permisoReal.data.nombre
    this.model.permiso = this.permisoReal.data.permiso
    this.model.descripcion = this.permisoReal.data.descripcion
  }

}
