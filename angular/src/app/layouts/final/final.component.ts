import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { IdiomaComponent } from '@component/globales/idioma/idioma.component';

import { STORAGE_KEY_TOKEN } from '@const/app.const';
import { LAYOUT_FINAL_PAGE_LOGOUT } from '@layout/const/layouts.const';

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

  public CURRENT_YEAR = new Date().getFullYear();

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  idiomaCambiar(valor: string){
    this.translate.use(valor)
  }

  cerrarSession(){
    localStorage.removeItem(STORAGE_KEY_TOKEN)
    this.router.navigate([LAYOUT_FINAL_PAGE_LOGOUT]);
  }

}
