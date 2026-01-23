
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

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

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private principalService: PrincipalService,
    private finalService: FinalService,
    private translate: TranslateService
  ){
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  typepassword = 'password'
  optionSelect = 0

  model = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isActive: false
  }

  validators = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    selectHas: false,
  }

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  showPassword(){
    this.typepassword = (this.typepassword === "password") ? "text" : "password"
  }

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.validators.firstName = (this.model.firstName.length === 0)
    this.validators.lastName = (this.model.lastName.length === 0)
    this.validators.email = (this.model.email.length === 0 || !regexEmail.test(this.model.email))
    this.validators.password = (this.model.password.length === 0)
    this.validators.selectHas = (this.optionSelect == 0)

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    (!this.validators.firstName && !this.validators.lastName && !this.validators.email && !this.validators.password && !this.validators.selectHas) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.firstName && !this.validators.lastName && !this.validators.email && !this.validators.password && !this.validators.selectHas
  }

  async crearUsuario(){

    if(this.isFormValid){
      this.model.isActive = (this.optionSelect == 1) ? true : false

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

}
