import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import axios from 'axios';
import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_FINAL_AUTH } from '@const/app.const';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private translate: TranslateService) {}

  async login(data: any){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = (data.rol == 0) ? STORAGE_KEY_ADMIN_AUTH : STORAGE_KEY_FINAL_AUTH
    let urlCopleta = environment.apiUrl+complemento+'/login'

    return await axios.request({
      method: 'post',
      url: urlCopleta,
      data: {
        "username": data.email,
        "pass": data.pass
      },
      params: {
        lang: lang,
      }
    })
  }

}
