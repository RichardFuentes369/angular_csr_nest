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
export class FiltroZonaComponent {

  complementoFiltro = ''

  model = {
    nombre: '',
    descripcion: ''
  }

  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.nombre = ''
    this.model.descripcion = ''
  }

  filtrar(){

    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
    }
    if(this.model.descripcion != ''){
      this.complementoFiltro += `&descripcion=${this.model.descripcion}`
    }

    $(".complementoRuta").val(this.complementoFiltro)
    this.complementoFiltro = ''

  }

}
