import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor() { }

  async permisos(idUsuario: number, modulo: string){
    let complemento = ''
    if(modulo != ''){
      complemento += `asignacion/mis-permisos?idUser=${idUsuario}&heredadosDe=${modulo}`
    }else{
      complemento = `asignacion/mis-permisos?idUser=${idUsuario}`
    }
    let urlCopleta = environment.apiUrl+complemento
    const data = axios.get(urlCopleta)
    return data
  }

}
