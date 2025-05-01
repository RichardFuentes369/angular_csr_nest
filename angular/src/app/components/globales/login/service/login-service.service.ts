import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  async login(data: any){
    let complemento = (data.rol == 0) ? 'authadmin' : 'authuser'
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
