import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { MantenimientoService } from '../../index/service/mantenimiento.service';
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@functions/System'
import { ZonaComunService } from '@module/zonaComun/index/service/zona-comun.service';

import moment from 'moment-timezone'


@Component({
  selector: 'app-crear-mantenimiento',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule],
  templateUrl: './crear-mantenimiento.component.html',
  styleUrl: './crear-mantenimiento.component.scss'
})
export class CrearMantenimientoComponent implements OnInit{

   constructor(
      private router: Router,
      private zonaComunService :ZonaComunService,
      private mantenimientoService: MantenimientoService,
      private translate: TranslateService
    ){}
  
    model = {
      descripcion: '',
      fecha_mantenimiento: 0,
      zona_id: ''
    }

    zona: any [] = []
  
    goTo (url: string, _id: number){
  
      if(_id != 0){
        this.router.navigate([url], { queryParams: { id: _id } });
      }else{
        this.router.navigate([url]);
      }
  
    }

    async ngOnInit() {
      const zonaList = await this.zonaComunService.listZonaSelect();
      if (zonaList && Array.isArray(zonaList.data)) {
        this.zona = zonaList.data
      }
    }
  
    async crearOrden(){
      const colombiaTimeZone = 'America/Bogota';
      let fechaMomentColombia = moment.tz(this.model.fecha_mantenimiento, colombiaTimeZone);
      let timestampSegundos = fechaMomentColombia.valueOf() / 1000;
      this.model.fecha_mantenimiento = timestampSegundos

      await this.mantenimientoService.createOrden(this.model)
      .then(response=>{
        ocultarModalOscura()
        this.translate.get('pages-mantenimiento.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
          localStorage.removeItem('profile')
          Swal.fire({
            title: this.translate.instant('pages-mantenimiento.Swal.TitleCreate'),
            text: this.translate.instant('pages-mantenimiento.Swal.TitleRegisterCreate'),
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
