import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { environment } from '@environment/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
  ) {}

  getToken(){
    return localStorage.getItem('token')
  }

  async validarToken(rol: string){
    let urlCopleta = environment.apiUrl+rol+'/profile'
    let headers = {
      'Authorization': `Bearer ${this.getToken()}`
    }

    try {
      await axios.get(urlCopleta, {headers})
      return true
    } catch(error) {
      return false
    }
  }

  async refreshToken(rol:string){
    let token = localStorage.getItem('token')
    let urlCopleta = environment.apiUrl+rol+'/refresh'
    let post = {
      'token': token
    }

    try {
      let data = (await axios.post(urlCopleta, post)).data
      localStorage.setItem('token', data);
      return data
    } catch(error) {
      localStorage.removeItem('token');
      return false
    }
  }

  async isAuth(rol: string){

    if(this.getToken() == null){
      return false;
    }

    if(!this.getToken()){
      return false
    }

    if(await this.validarToken(rol)){
      return true;
    }

    let refreshTokenResponse = await this.refreshToken(rol)

    if(refreshTokenResponse){
      localStorage.setItem('token', refreshTokenResponse);
      return true
    }else{
      localStorage.removeItem('token');
      return false
    }

  }

  async getUser(rol: string){

    let urlCopleta = environment.apiUrl+rol+'/profile'
    const data = await axios.get(urlCopleta, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return data
  }

}
