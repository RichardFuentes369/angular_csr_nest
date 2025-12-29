
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { ModulosService } from '@mod/modules/admin/service/modulos.service';

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

  mostrarCheck = false

  model = {
    modulo_padre_id: 0,
    nombre: '',
    permiso: '',
    descripcion: '',
    tiene_submodulos: false
  }

  async ngOnInit() {
    if(localStorage.getItem('modulo') && !localStorage.getItem('submodulo')){
      this.model.modulo_padre_id = parseInt(localStorage.getItem('modulo') ?? '0', 10)
      this.mostrarCheck = false
    }
    if(!localStorage.getItem('modulo') && localStorage.getItem('submodulo')){
      this.model.modulo_padre_id = parseInt(localStorage.getItem('submodulo') ?? '0', 10)
      this.mostrarCheck = false
    }
    if(localStorage.getItem('modulo') && localStorage.getItem('submodulo')){
      this.model.modulo_padre_id = parseInt(localStorage.getItem('submodulo') ?? '0', 10)
      this.mostrarCheck = false
    }
    if(!localStorage.getItem('modulo') && !localStorage.getItem('submodulo')){
      this.model.modulo_padre_id = 0
      this.mostrarCheck = true
    }
  }

  async crearModuloPermiso(){
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
      this.translate.get('pages-modulos.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
        Swal.fire({
          title: this.translate.instant('pages-modulos.Swal.TitleCreate'),
          text: this.translate.instant('pages-modulos.Swal.TitleRegisterCreate'),
          icon: "success"
        });
      });
    }
  }

}
