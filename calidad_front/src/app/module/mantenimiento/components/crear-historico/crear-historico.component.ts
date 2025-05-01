import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { MantenimientoService } from '../../index/service/mantenimiento.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ocultarModalOscura } from '@functions/System'
import { ProveedorService } from '@module/proveedor/index/service/proveedor.service';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';

@Component({
  selector: 'app-crear-historico',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule],
  templateUrl: './crear-historico.component.html',
  styleUrl: './crear-historico.component.scss'
})
export class CrearHistoricoComponent implements OnInit{

    constructor(
      private router: Router,
      private route :ActivatedRoute,
      private proveedorService :ProveedorService,
      private mantenimientoService: MantenimientoService,
      private translate: TranslateService
    ){}
  
    model = {
      observacion: '',
      precio: '',
      recomendacion: '',
      orden_id: '',
      proveedor_id: ''
    }

    proveedor: any [] = []

    goTo (url: string, _id: number){
  
      if(_id != 0){
        this.router.navigate([url], { queryParams: { id: _id } });
      }else{
        this.router.navigate([url]);
      }
  
    }

    async ngOnInit() {
      this.model.observacion = ''
      this.model.precio = ''
      this.model.recomendacion = ''
      this.model.recomendacion = ''
      this.model.proveedor_id = ''

      const proveedorList = await this.proveedorService.listProveedorSelect();
      if (proveedorList && Array.isArray(proveedorList.data)) {
        this.proveedor = proveedorList.data
      }
    }

    @Output()
    actualizarTabla = new EventEmitter<string>()
    async crearHistory(){
      this.model.orden_id = this.route.snapshot.queryParams['id']
      await this.mantenimientoService.createHistory(this.model)
      .then(response=>{
        this.model.observacion = ''
        this.model.precio = ''
        this.model.recomendacion = ''
        this.model.recomendacion = ''
        this.model.proveedor_id = ''

        this.translate.get('pages-mantenimiento.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
          localStorage.removeItem('profile')
          Swal.fire({
            title: this.translate.instant('pages-mantenimiento.Swal.TitleCreate'),
            text: this.translate.instant('pages-mantenimiento.Swal.TitleRegisterCreate'),
            icon: "success"
          });
        });
        this.actualizarTabla.emit()
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
