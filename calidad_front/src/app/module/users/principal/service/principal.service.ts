import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor() { }

  async getDataUser(id: string){
    let complemento = 'admin/obtener-administrador/'
    let urlCopleta = environment.apiUrl+complemento+id

    return await axios.request({
      method: 'get',
      url: urlCopleta,
    })
  }

  async createUser(data: any){
    let complemento = 'admin/crear-admininistrador/'
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'post',
      url: urlCopleta,
      data: data,
    })
  }

  async updateUser(data: any, id: string){
    let complemento = `admin/editar-administrador/${id}`
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'patch',
      url: urlCopleta,
      data: data,
    })
  }

  async deleteUser(id: string){
    let complemento = 'admin/eliminar-admininistrador/'
    let urlCopleta = environment.apiUrl+complemento+id

    return await axios.request({
      method: 'delete',
      url: urlCopleta,
    })
  }

}



