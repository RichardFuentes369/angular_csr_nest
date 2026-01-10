import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { TranslateService } from '@ngx-translate/core';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private translate: TranslateService) {}

  async permisos(idUsuario: number, modulo: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
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

  async permisoPage(idModulo: number | null, nombre: string, idUser: number){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = ''
    complemento += `asignacion/getAsignacionMePertenece?idModulo=${idModulo}&nombre=${nombre}&idUser=${idUser}`
    let urlCopleta = environment.apiUrl+complemento
    const data = axios.get(urlCopleta)
    return data
  }

}
