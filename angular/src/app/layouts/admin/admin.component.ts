import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { BreadcrumbsComponent } from '@component/globales/breadcrumb/breadcrumb.component';
import { IdiomaComponent } from '@component/globales/idioma/idioma.component';
import { CommonModule } from '@angular/common';

import { STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const'
import { NAME_PAGE, LAYOUT_ADMIN_PAGE_LOGOUT, LAYOUT_PAGE_PROFILE, LAYOUT_PAGE_SETTINGS } from '@layout/const/layouts.const'
import { LAYOUT_ADMIN_PAGE_MOD } from '@mod/me/const/me.const'
import { ColormodeComponent } from '@component/globales/colormode/colormode.component';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    ColormodeComponent,
    IdiomaComponent,
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  public NAME_PAGE = NAME_PAGE;
  public LAYOUT_PAGE_PROFILE = LAYOUT_PAGE_PROFILE;
  public LAYOUT_PAGE_SETTINGS = LAYOUT_PAGE_SETTINGS;
  public LAYOUT_ADMIN_PAGE_MOD = LAYOUT_ADMIN_PAGE_MOD;
  public CURRENT_YEAR = new Date().getFullYear();

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  minimizarSliderbar: boolean = false;
  nombreModulo: string = '';

  ngOnInit(): void {
  }

  upperFirst(texto: string) {
    if (!texto) return texto; // Verifica si la cadena está vacía o es nula
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  idiomaCambiar(valor: string){
    this.translate.use(valor)
  }

  cerrarSession(){
    localStorage.removeItem(STORAGE_KEY_TOKEN_ADMIN)
    localStorage.removeItem(STORAGE_KEY_TOKEN_FINAL)
    this.router.navigate([LAYOUT_ADMIN_PAGE_LOGOUT]);
  }

  mostrarMenuLateral(){
    this.minimizarSliderbar = !this.minimizarSliderbar
  }

}
