import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TablecrudService {

  async getData(url: string, page: number, limit: number){
    let urlCopleta = environment.apiUrl+url+`?page=${page}&limit=${limit}&field=id&order=asc`

    return await axios.request({
      method: 'get',
      url: urlCopleta,
    })
  }

}
