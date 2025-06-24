import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@functions/System'

@Component({
  selector: 'app-crear-modulo-permiso',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule],
  templateUrl: './crear-modulo-permiso.component.html',
  styleUrl: './crear-modulo-permiso.component.scss'
})
export class CrearModuloPermisoComponent {

  constructor(
    private router: Router,
    private translate: TranslateService
  ){}

  model = {
    namePermission: '',
    nickPermission: '',
    descriptionPermission: ''
  }

  crearModuloPermiso(){

  }

}
