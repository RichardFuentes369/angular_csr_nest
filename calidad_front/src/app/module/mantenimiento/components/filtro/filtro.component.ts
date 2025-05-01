import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZonaComunService } from '@module/zonaComun/index/service/zona-comun.service';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment-timezone';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroMantenimientoComponent implements OnInit{
  
  constructor(
    private zonaComunService :ZonaComunService,
  ){ }

  zona: any [] = []

  complementoFiltro = ''

  model = {
    serial: '',
    descripcion: '',
    precio: '',
    fecha_mantenimiento_inicio: '',
    fecha_mantenimiento_fin: '',
    fecha_creacion: '',
    estado: '',
    zona_id: '',
  }

  async ngOnInit() {
    const zonaList = await this.zonaComunService.listZonaSelect();
    if (zonaList && Array.isArray(zonaList.data)) {
      this.zona = zonaList.data
    }
  }

  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.serial = '',
    this.model.descripcion = '',
    this.model.precio = '',
    this.model.fecha_mantenimiento_inicio = '',
    this.model.fecha_mantenimiento_fin = '',
    this.model.fecha_creacion = '',
    this.model.estado = '',
    this.model.zona_id = ''
  }

  dateToTimestamp(dateString: string) {
    const date = moment(dateString, 'YYYY-MM-DD');
    const colombiaDate = date.tz('America/Bogota');
    const formattedDate = colombiaDate.unix();
    return formattedDate;
  }
  
  filtrar(){

    if(this.model.serial != ''){
      this.complementoFiltro += `&serial=${this.model.serial}`
    }
    if(this.model.descripcion != ''){
      this.complementoFiltro += `&descripcion=${this.model.descripcion}`
    }
    if(this.model.precio != ''){
      this.complementoFiltro += `&precio=${this.model.precio}`      
    }
    if(this.model.fecha_mantenimiento_inicio != ''){
      let fecha_mantenimiento_inicio = this.dateToTimestamp(this.model.fecha_mantenimiento_inicio)
      this.complementoFiltro += `&fecha_mantenimiento_inicio=${fecha_mantenimiento_inicio}`      
    }    
    if(this.model.fecha_mantenimiento_fin != ''){
      let fecha_mantenimiento_fin = this.dateToTimestamp(this.model.fecha_mantenimiento_fin)
      this.complementoFiltro += `&fecha_mantenimiento_fin=${fecha_mantenimiento_fin}`      
    }    
    if(this.model.fecha_creacion != ''){
      let fecha_creacion = this.dateToTimestamp(this.model.fecha_creacion)
      this.complementoFiltro += `&fecha_creacion=${fecha_creacion}`      
    }   
    if(this.model.estado != ''){
      this.complementoFiltro += `&estado=${this.model.estado}`      
    }    
    if(this.model.zona_id != ''){
      this.complementoFiltro += `&zona_id=${this.model.zona_id}`      
    }

    $(".complementoRuta").val(this.complementoFiltro)
    this.complementoFiltro = ''

  }

}
