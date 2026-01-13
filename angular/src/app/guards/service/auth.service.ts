import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { STORAGE_KEY_TOKEN, STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const';
import { environment } from '@environment/environment';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  getToken(){
    const token = (localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)) ? localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN) : localStorage.getItem(STORAGE_KEY_TOKEN_FINAL)
    return token
  }

  async validarToken(rol: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let urlCopleta = environment.apiUrl+rol+'/profile'
    let headers = {
      'Authorization': `Bearer ${this.getToken()}`
    }

    try {
      await axios.get(urlCopleta, {headers})
      return true
    } catch(error) {
      return false
    }
  }

  async refreshToken(rol:string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    const token = (localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)) ? localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN) : localStorage.getItem(STORAGE_KEY_TOKEN_FINAL)
    let urlCopleta = environment.apiUrl+rol+'/refresh'
    let post = {
      'token': token
    }

    try {
      let data = (await axios.post(urlCopleta, post)).data
      if(localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)){
        localStorage.setItem(STORAGE_KEY_TOKEN_ADMIN, data);
      }
      if(localStorage.getItem(STORAGE_KEY_TOKEN_FINAL)){
        localStorage.setItem(STORAGE_KEY_TOKEN_FINAL, data);
      }
      return data
    } catch(error) {
      if(localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)){
        localStorage.removeItem(STORAGE_KEY_TOKEN_ADMIN);
      }
      if(localStorage.getItem(STORAGE_KEY_TOKEN_FINAL)){
        localStorage.removeItem(STORAGE_KEY_TOKEN_FINAL);
      }
      return false
    }
  }

  async isAuth(rol: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';

    if(this.getToken() == null){
      return false;
    }

    if(!this.getToken()){
      return false
    }

    if(await this.validarToken(rol)){
      return true;
    }

    let refreshTokenResponse = await this.refreshToken(rol)

    if(refreshTokenResponse){
      if(localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)){
        localStorage.setItem(STORAGE_KEY_TOKEN_ADMIN, refreshTokenResponse);
      }
      if(localStorage.getItem(STORAGE_KEY_TOKEN_FINAL)){
        localStorage.setItem(STORAGE_KEY_TOKEN_FINAL, refreshTokenResponse);
      }
      return true
    }else{
      if(localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)){
        localStorage.removeItem(STORAGE_KEY_TOKEN_ADMIN);
      }
      if(localStorage.getItem(STORAGE_KEY_TOKEN_FINAL)){
        localStorage.removeItem(STORAGE_KEY_TOKEN_FINAL);
      }
      return false
    }

  }

  async getUser(rol: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let urlCopleta = environment.apiUrl+rol+'/profile'
    const data = await axios.get(urlCopleta, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });

    return data
  }

}

