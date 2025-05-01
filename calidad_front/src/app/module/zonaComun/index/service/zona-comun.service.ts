import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ZonaComunService {

  constructor() { }

  async getDataZone(id: string){
    let complemento = 'zona/obtener-zona/'
    let urlCopleta = environment.apiUrl+complemento+id

    return await axios.request({
      method: 'get',
      url: urlCopleta,
    })
  }

  async createZona(data: any){
    let complemento = 'zona/crear-zona/'
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'post',
      url: urlCopleta,
      data: data,
    })
  }

  async updateZona(data: any, id: string){
    let complemento = `zona/editar-zona/${id}`
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'patch',
      url: urlCopleta,
      data: data,
    })
  }

  async deleteZona(id: string){
    let complemento = 'zona/eliminar-zona/'
    let urlCopleta = environment.apiUrl+complemento+id

    return await axios.request({
      method: 'delete',
      url: urlCopleta,
    })
  }

  async listZonaSelect(){
    let complemento = 'zona/zonaSelect/'
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'get',
      url: urlCopleta,
    })
  }

}
