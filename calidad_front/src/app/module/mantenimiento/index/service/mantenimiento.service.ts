import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor() { }

  // orden
  async getDataOrden(id: string){
    let complemento = `orden-mantenimiento/orden/`
    let urlCopleta = environment.apiUrl+complemento+id

    return await axios.request({
      method: 'get',
      url: urlCopleta,
    })
  }

  async createOrden(data: any){
    let complemento = 'orden-mantenimiento'
    let urlCopleta = environment.apiUrl+complemento

    data.zona_id = parseInt(data.zona_id) 

    return await axios.request({
      method: 'post',
      url: urlCopleta,
      data: data,
    })
  }

  async updateOrden(data: any){
    let complemento = `orden-mantenimiento/${data.id}`
    let urlCopleta = environment.apiUrl+complemento
    
    return await axios.request({
      method: 'patch',
      url: urlCopleta,
      data: {'estado': data.estado},
    })
  }

  async deleteOrden(id: string){
    let complemento = 'orden-mantenimiento/'
    let urlCopleta = environment.apiUrl+complemento+id

    return await axios.request({
      method: 'delete',
      url: urlCopleta,
    })
  }


  // historico
  async createHistory(data: any){
    let complemento = `orden-historico/${data.orden_id}`
    let urlCopleta = environment.apiUrl+complemento

    data.orden_id = parseInt(data.orden_id) 
    data.proveedor_id = parseInt(data.proveedor_id  ) 

    return await axios.request({
      method: 'post',
      url: urlCopleta,
      data: data,
    })
  }

  async deleteHistorico(id: string){
    let complemento = 'orden-historico/'
    let urlCopleta = environment.apiUrl+complemento+id

    return await axios.request({
      method: 'delete',
      url: urlCopleta,
    })
  }

  
}
