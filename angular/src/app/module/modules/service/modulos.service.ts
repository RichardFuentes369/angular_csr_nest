import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  constructor() { }

  async getHasSubmodule(id: number){
    let complemento = `modulos/getHasSubmodule?idModulo=${id}`
    let urlCopleta = environment.apiUrl+complemento
    const data = axios.get(urlCopleta)
    return data
  }  
  
  async listaPermisos(id: number){
    let complemento = `modulos/getPermisosPorUsuario?userId=${id}`
    let urlCopleta = environment.apiUrl+complemento
    const data = axios.get(urlCopleta)
    return data
  }

  async buscarPermiso(padreId:number, nombrePermiso: string){
    let complemento = `modulos/getPermisoExistente?idModulo=${padreId}&nombre=${nombrePermiso}`
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'get',
      url: urlCopleta,
    })
  }

  async asignarPermiso(idPermiso: string, idPadre: string, opcion: string, userId: string){
    let complemento = `asignacion/updateAsignacionPermiso?idPermiso=${idPermiso}&idPadre=${idPadre}&idUser=${userId}&opcion=${opcion}`
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'put',
      url: urlCopleta,
    })
  }

  async crearPermiso(data: any){
    let complemento = `modulos/postModuloPermiso`
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      method: 'post',
      data: data,
      url: urlCopleta,
    })
  }

  async eliminarPermiso(id: any){

    let complemento = `modulos/deleteModuloPermiso`
    let urlCopleta = environment.apiUrl+complemento+'?idPermiso='+id

    return await axios.request({
      method: 'delete',
      url: urlCopleta,
    })
  }

}
