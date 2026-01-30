import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { IdiomaComponent } from '@component/globales/idioma/idioma.component';

import { STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const';
import { LAYOUT_FINAL_PAGE_LOGOUT, LAYOUT_PAGE_PROFILE, LAYOUT_PAGE_SETTINGS, NAME_PAGE } from '@layout/const/layouts.const';
import { CommonModule } from '@angular/common';
import { ColormodeComponent } from '@component/globales/colormode/colormode.component';

@Component({
  selector: 'app-layout-final',
  standalone: true,
  imports: [
    IdiomaComponent,
    ColormodeComponent,
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './final.component.html',
  styleUrl: './final.component.scss'
})
export class FinalComponent {

  public NAME_PAGE = NAME_PAGE;
  public LAYOUT_PAGE_PROFILE = LAYOUT_PAGE_PROFILE;
  public LAYOUT_PAGE_SETTINGS = LAYOUT_PAGE_SETTINGS;
  
  public CURRENT_YEAR = new Date().getFullYear();

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  idiomaCambiar(valor: string){
    this.translate.use(valor)
  }

  cerrarSession(){
    localStorage.removeItem(STORAGE_KEY_TOKEN_ADMIN)
    localStorage.removeItem(STORAGE_KEY_TOKEN_FINAL)
    this.router.navigate([LAYOUT_FINAL_PAGE_LOGOUT]);
  }

}
