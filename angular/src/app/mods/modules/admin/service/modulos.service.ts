import { Injectable } from '@angular/core';
import { STORAGE_KEY_TOKEN_ADMIN, WORD_KEY_AUTHORIZATION_APPLICATION_TYPE, WORD_KEY_AUTHORIZATION_CONTENT_TYPE, WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';
import { environment } from '@environment/environment';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  constructor(
    private translate: TranslateService
  ) { }

  async getHasSubmodule(id: number){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `modulos/getHasSubmodule?idModulo=${id}&lang=${lang}`
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
  
  async listaPermisos(id: number){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `modulos/getPermisosPorUsuario?userId=${id}&lang=${lang}`
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

  async buscarPermiso(padreId:number, nombrePermiso: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `modulos/getPermisoExistente?idModulo=${padreId}&nombre=${nombrePermiso}&lang=${lang}`
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'get',
      url: urlCopleta,
    })
  }

  async asignarPermiso(idPermiso: string, idPadre: string, opcion: string, userId: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `asignacion/updateAsignacionPermiso?idPermiso=${idPermiso}&idPadre=${idPadre}&idUser=${userId}&opcion=${opcion}&lang=${lang}`
    let urlCopleta = environment.apiUrl+complemento

    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'put',
      url: urlCopleta,
      params: {
        lang: lang,
      }
    })
  }

  async crearPermiso(data: any){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `modulos/postModuloPermiso?lang=${lang}`
    let urlCopleta = environment.apiUrl+complemento

    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'post',
      data: data,
      url: urlCopleta,
      params: {
        lang: lang,
      }
    })
  }

  async actualizarPermiso(data: any, id: number){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    const permiso = id;
    let complemento = `modulos/editModuloPermiso`
    let urlCopleta = environment.apiUrl+complemento
    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'patch',
      url: urlCopleta,
      data: data,
      params: {
        lang: lang,
        idPermiso: permiso
      }
    })
  }

  async eliminarPermiso(id: any){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `modulos/deleteModuloPermiso?idPermiso=${+id}&lang=${lang}`
    let urlCopleta = environment.apiUrl+complemento

    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'delete',
      url: urlCopleta,
      params: {
        lang: lang,
      }
    })
  }

}
