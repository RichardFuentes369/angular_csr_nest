import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import axios from 'axios';
import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_FINAL_AUTH } from '@const/app.const';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  async login(data: any){
    let complemento = (data.rol == 0) ? STORAGE_KEY_ADMIN_AUTH : STORAGE_KEY_FINAL_AUTH
    let urlCopleta = environment.apiUrl+complemento+'/login'

    return await axios.request({
      method: 'post',
      url: urlCopleta,
      data: {
        "username": data.email,
        "pass": data.pass
      },
    })
  }

}
