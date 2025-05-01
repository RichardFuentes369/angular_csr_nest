import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroProveedorComponent {

  complementoFiltro = ''

  model = {
    razonSocial: '',
    email: '',
    estado: '',
    nit: ''
  }

  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.email = ''
    this.model.razonSocial = ''
    this.model.estado = ''
    this.model.nit = ''
  }
  
  filtrar(){

    if(this.model.email != ''){
      this.complementoFiltro += `&email=${this.model.email}`
    }
    if(this.model.razonSocial != ''){
      this.complementoFiltro += `&razonSocial=${this.model.razonSocial}`
    }
    if(this.model.estado != ''){
      let opcion = (this.model.estado == "true") ? 'Activo':'Inactivo'
      this.complementoFiltro += `&estado=${opcion}`
    }
    if(this.model.nit != ''){
      this.complementoFiltro += `&nit=${this.model.nit}`
    }

    $(".complementoRuta").val(this.complementoFiltro)
    this.complementoFiltro = ''

  }

}
