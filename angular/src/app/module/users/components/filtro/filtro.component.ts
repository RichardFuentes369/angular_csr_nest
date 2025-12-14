import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroUsuariosComponent implements OnInit {

  complementoFiltro = ''

  model = {
    email: '',
    firstName: '',
    lastName: '',
    isActive: ''
  }

  async ngOnInit() {
    this.model = {
      email: sessionStorage.getItem('email') || '',
      firstName: sessionStorage.getItem('firstName') || '',
      lastName: sessionStorage.getItem('lastName') || '',
      isActive: sessionStorage.getItem('isActive') || ''
    }

    this.complementoFiltro = ''
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
  }
  
  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.email = ''
    this.model.firstName = ''
    this.model.lastName = ''
    this.model.isActive = ''

    sessionStorage.removeItem('email')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')
    sessionStorage.removeItem('isActive')
  }
  
  filtrar(){
    this.complementoFiltro = ''
    
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')
    sessionStorage.removeItem('isActive')

    if(this.model.email != ''){
      this.complementoFiltro += `&email=${this.model.email}`
      sessionStorage.setItem('email', this.model.email)
    }
    if(this.model.firstName != ''){
      this.complementoFiltro += `&firstName=${this.model.firstName}`
      sessionStorage.setItem('firstName', this.model.firstName)
    }
    if(this.model.lastName != ''){
      this.complementoFiltro += `&lastName=${this.model.lastName}`      
      sessionStorage.setItem('lastName', this.model.lastName)
    }
    if(this.model.isActive != ''){
      this.complementoFiltro += `&isActive=${this.model.isActive}`      
      sessionStorage.setItem('isActive', this.model.isActive)
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }

}
