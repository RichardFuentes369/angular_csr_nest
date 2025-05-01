import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroUsuariosComponent {

  complementoFiltro = ''

  model = {
    email: '',
    firstName: '',
    lastName: '',
    isActive: ''
  }

  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.email = ''
    this.model.firstName = ''
    this.model.lastName = ''
    this.model.isActive = ''
  }
  
  filtrar(){

    if(this.model.email != ''){
      this.complementoFiltro += `&email=${this.model.email}`
    }
    if(this.model.firstName != ''){
      this.complementoFiltro += `&firstName=${this.model.firstName}`
    }
    if(this.model.lastName != ''){
      this.complementoFiltro += `&lastName=${this.model.lastName}`      
    }
    if(this.model.isActive != ''){
      this.complementoFiltro += `&isActive=${this.model.isActive}`      
    }

    $(".complementoRuta").val(this.complementoFiltro)
    this.complementoFiltro = ''

  }

}
