import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environment/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(
    private translate: TranslateService
  ) {
  }

  async getDataUser(id: string){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'admin/obtener-administrador/'
    let urlCopleta = environment.apiUrl+complemento+id

    return await axios.request({
      method: 'get',
      url: urlCopleta,
      params: {
        lang: lang,
      }
    })
  }

  async createUser(data: any){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'admin/crear-admininistrador/'
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'post',
      url: urlCopleta,
      data: data,
      params: {
        lang: lang,
      }
    })
  }

  async updateUser(data: any, id: string){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `admin/editar-administrador/${id}`
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'patch',
      url: urlCopleta,
      data: data,
      params: {
        lang: lang,
      }
    })
  }

  async updatestatusUser(id: string[], option: string){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'admin/actualizar-estado-admininistrador/'
    let urlCopleta = environment.apiUrl+complemento

    let data = {
      'id': id,
      'option': option,
    }

    return await axios.request({
      method: 'patch',
      url: urlCopleta,
      data: data,
      params: {
        lang: lang,
      }
    })
  }

  async deleteUser(id: string[]){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'admin/eliminar-admininistrador/'
    let urlCopleta = environment.apiUrl+complemento+id

    return await axios.request({
      method: 'delete',
      url: urlCopleta,
      params: {
        lang: lang,
      }
    })
  }

}



