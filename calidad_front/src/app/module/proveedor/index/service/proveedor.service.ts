import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor() { }

  async getDataSupplier(id: string){
    let complemento = 'proveedor/obtener-proveedor/'
    let urlCopleta = environment.apiUrl+complemento+id

    return await axios.request({
      method: 'get',
      url: urlCopleta,
    })
  }

  async createSupplier(data: any){
    let complemento = 'proveedor/crear-proveedor/'
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'post',
      url: urlCopleta,
      data: data,
    })
  }

  async updateSupplier(data: any, id: string){
    let complemento = `proveedor/editar-proveedor/${id}`
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'patch',
      url: urlCopleta,
      data: data,
    })
  }

  async deleteSupplier(id: string){
    let complemento = 'proveedor/eliminar-proveedor/'
    let urlCopleta = environment.apiUrl+complemento+id

    return await axios.request({
      method: 'delete',
      url: urlCopleta,
    })
  }

  async listProveedorSelect(){
    let complemento = 'proveedor/proveedorSelect/'
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'get',
      url: urlCopleta,
    })
  }
}
