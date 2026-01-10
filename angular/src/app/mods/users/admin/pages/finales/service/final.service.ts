import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FinalService {

  constructor(private translate: TranslateService) { }

  async getDataUser(id: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'user/obtener-usuario/'
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
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'user/crear-usuario/'
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
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `user/editar-usuario/${id}`
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
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'user/actualizar-estado-admininistrador/'
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
    let complemento = 'user/eliminar-usuario/'
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
