import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { _PAGE_BACK_HOME, STORAGE_KEY_TOKEN, STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL, WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';
import { environment } from '@environment/environment';
import { LAYOUT_ADMIN_PAGE_LOGOUT, LAYOUT_FINAL_PAGE_LOGOUT } from '@layout/const/layouts.const';
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
    const adminToken = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN);
    const finalToken = localStorage.getItem(STORAGE_KEY_TOKEN_FINAL);
    const token = adminToken || finalToken || '';
    return token
  }

  async validarToken(rol: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `${rol}/profile?lang=${lang}`
    let urlCopleta = environment.apiUrl + complemento

    let headers = {
      WORD_KEY_AUTHORIZATION_GLOBAL: `${WORD_KEY_BEARER_GLOBAL} ${this.getToken()}`
    }

    try {
      await axios.get(urlCopleta, {headers})
      return true
    } catch(error) {
      return false
    }
  }

  async getUser(rol: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `${rol}/profile?lang=${lang}`
    let urlCopleta = environment.apiUrl + complemento

    const data = await axios.get(urlCopleta, {
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${this.getToken()}`
      }
    });

    return data
  }

  async refreshToken(rol:string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    
    const adminToken = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN);
    const finalToken = localStorage.getItem(STORAGE_KEY_TOKEN_FINAL);
    
    const token = adminToken || finalToken || '';

    const removeToken = () => {
        if (adminToken) {
          localStorage.removeItem(STORAGE_KEY_TOKEN_ADMIN);
          this.router.navigate([LAYOUT_ADMIN_PAGE_LOGOUT]);
        } else if (finalToken) {
          localStorage.removeItem(STORAGE_KEY_TOKEN_FINAL);
          this.router.navigate([LAYOUT_FINAL_PAGE_LOGOUT]);
        } else {
          localStorage.removeItem(STORAGE_KEY_TOKEN_ADMIN);
          localStorage.removeItem(STORAGE_KEY_TOKEN_FINAL);
          this.router.navigate([_PAGE_BACK_HOME]); 
        }
    };

    if (!token) {
      console.error('Token vacío o nulo detectado, limpiando...');
      removeToken();
      return false; 
    }

    let complemento = `${rol}/refresh?lang=${lang}`
    let urlCopleta = environment.apiUrl+complemento

    try {
      let data = (await axios.post(urlCopleta, {[STORAGE_KEY_TOKEN]: token})).data
      if(localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)){
        localStorage.setItem(STORAGE_KEY_TOKEN_ADMIN, data);
      }
      if(localStorage.getItem(STORAGE_KEY_TOKEN_FINAL)){
        localStorage.setItem(STORAGE_KEY_TOKEN_FINAL, data);
      }
      return data
    } catch(error) {
      removeToken()
      return false
    }
  }

  async isAuth(rol: string){
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
    }
    return false
  }

}

