
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { STORAGE_KEY_MODULE, STORAGE_KEY_SUBMODULE } from '@mod/modules/const/modules.const';

@Component({
  selector: 'app-editar-modulo-permiso',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './editar-modulo-permiso.component.html',
  styleUrl: './editar-modulo-permiso.component.scss'
})
export class EditarModuloPermisoComponent implements OnInit{

  constructor(
    private router: Router,
    private translate: TranslateService
  ){}

  mostrarCheck = false

  model = {
    nombre: '',
    permiso: '',
    descripcion: '',
    tiene_submodulos: false
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
  }

}
