import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { swalert } from '@function/System'
import { LoginServiceService } from './service/login-service.service'


import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from '../loading/loading.component';
import { STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const';

@Component({
  selector: 'app-globales-login',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    LoadingComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService :LoginServiceService
  ) { }

  isPending = false;
  isLoginAdmin = true
  urlPeticion = ''
  typefield = 'password'

  model = {
    email: '',
    password: ''
  }

  ngOnInit() {
    this.urlPeticion = this.router.url
    this.isLoginAdmin = this.urlPeticion.split('/').find(e => e == 'admin') ? true : false

    if(this.isLoginAdmin){
      this.model.email = 'admin1@correo.com'
      this.model.password = 'Qwerty9601'
    }else{
      this.model.email = 'final1@gmail.com'
      this.model.password = 'Qwerty9601'
    }
  }

  showPassword(){
    this.typefield = (this.typefield === "password") ? "text" : "password"
  }

  async ingresar(){
    this.isPending = true;
    let rol = this.urlPeticion.split('/').find(e => e == 'admin') ? 0 : 1
    let data = {
      'email': this.model.email,
      'pass': this.model.password,
      'rol': rol
    }

    await this.loginService.login(data)
    .then(response=>{
      if(rol == 0){
        this.isPending = false;
        localStorage.setItem(STORAGE_KEY_TOKEN_ADMIN,response.data.access_token)
        this.router.navigate(['/admin']);
      }else{
        this.isPending = false;
        localStorage.setItem(STORAGE_KEY_TOKEN_FINAL,response.data.access_token)
        this.router.navigate(['/final']);
      }
    }).catch(err =>{
      this.isPending = false;
      swalert(err.response.data.message, err.response.data.error, 'error')
    })
  }

}
