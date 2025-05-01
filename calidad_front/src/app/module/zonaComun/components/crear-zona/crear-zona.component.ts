import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { ZonaComunService  } from '../../index/service/zona-comun.service';
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@functions/System'
import { FinalService } from '@module/users/finales/service/final.service';

@Component({
  selector: 'app-crear-zona',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule],
  templateUrl: './crear-zona.component.html',
  styleUrl: './crear-zona.component.scss'
})
export class CrearZonaComponent {

  constructor(
    private router: Router,
    private zonaComunService: ZonaComunService,
    private translate: TranslateService
  ){}

  model = {
    nombre: '',
    descripcion: '',
    ubicacion: '',
  }

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  async crearZonaSocial(){

    await this.zonaComunService.createZona(this.model)
    .then(response=>{
      ocultarModalOscura()
      this.translate.get('pages-zonaComun.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
        localStorage.removeItem('profile')
        Swal.fire({
          title: this.translate.instant('pages-zonaComun.Swal.TitleCreate'),
          text: this.translate.instant('pages-zonaComun.Swal.TitleRegisterCreate'),
          icon: "success"
        });
      });
    }).catch(err =>{
      console.log(err)
      Swal.fire({
        title: err.response.data.message,
        text: err.response.data.error,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    })

  }

}
