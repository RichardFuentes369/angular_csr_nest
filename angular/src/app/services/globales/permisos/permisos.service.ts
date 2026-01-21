import { Injectable } from '@angular/core';
import { STORAGE_KEY_TOKEN_ADMIN, WORD_KEY_AUTHORIZATION_APPLICATION_TYPE, WORD_KEY_AUTHORIZATION_CONTENT_TYPE, WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';
import { environment } from '@environment/environment';
import { TranslateService } from '@ngx-translate/core';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private translate: TranslateService) {}

  async permisos(idUsuario: number, modulo: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = ''
    if(modulo != ''){
      complemento += `asignacion/mis-permisos?idUser=${idUsuario}&heredadosDe=${modulo}&lang=${lang}`
    }else{
      complemento = `asignacion/mis-permisos?idUser=${idUsuario}&lang=${lang}`
    }
    let urlCopleta = environment.apiUrl+complemento

    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'get',
      url: urlCopleta,
      params: {
        lang: lang,
      }
    })
  }

  async permisoPage(idModulo: number | null, nombre: string, idUser: number){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = ''
    complemento += `asignacion/getAsignacionMePertenece?idModulo=${idModulo}&nombre=${nombre}&idUser=${idUser}&lang=${lang}`
    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'get',
      url: urlCopleta,
      params: {
        lang: lang,
      }
    })
  }

}
