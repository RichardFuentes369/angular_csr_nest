import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { IdiomaComponent } from '@component/globales/idioma/idioma.component';
@Component({
  selector: 'app-layout-final',
  standalone: true,
  imports: [
    IdiomaComponent,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './final.component.html',
  styleUrl: './final.component.scss'
})
export class FinalComponent {

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  idiomaCambiar(valor: string){
    this.translate.use(valor)
  }

  cerrarSession(){
    localStorage.removeItem('token')
    this.router.navigate(['/home/ingreso/final']);
  }

}
