import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import Swal from 'sweetalert2'
import { IdiomaComponent } from '@component/globales/idioma/idioma.component';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    IdiomaComponent,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  idiomaCambiar(valor: string){
    this.translate.use(valor)
  }

  cerrarSession(){
    localStorage.removeItem('token')
    this.router.navigate(['/inicio/ingreso/user']);
  }

}
