
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { FinalService } from '@mod/users/admin/pages/finales/service/final.service';
import { AvatarComponent } from '@component/globales/avatar/avatar.component';
import { STORAGE_KEY_PROFILE } from '@const/app.const';

@Component({
  selector: 'app-crear-usuarios',
  standalone: true,
  imports: [TranslateModule, FormsModule, AvatarComponent],
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.scss'
})

export class CrearUsuariosComponent {

  constructor(
    private router: Router,
    private principalService: PrincipalService,
    private finalService: FinalService,
    private translate: TranslateService
  ){}

  model = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isActive: 0
  }

  typefield = 'password'

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  showPassword(){
    this.typefield = (this.typefield === "password") ? "text" : "password"
  }

  async crearUsuario(){

    let complemento = localStorage.getItem(STORAGE_KEY_PROFILE)
    let endPoint

    if(complemento == 'admin'){
      endPoint = this.principalService
    }else{
      endPoint = this.finalService
    }

    const response = await endPoint.createUser(this.model)
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
      Swal.fire({
        title: this.translate.instant('mod-users.SWAL_CREATED'),
        text: this.translate.instant('mod-users.SWAL_CREATED_RECORD'),
        icon: "success"
      });
    }

  }

}
