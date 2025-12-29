import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { BreadcrumbsComponent } from '@component/globales/breadcrumb/breadcrumb.component';
import { IdiomaComponent } from '@component/globales/idioma/idioma.component';
import { CommonModule } from '@angular/common';

import { STORAGE_KEY_TOKEN } from '@const/app.const'
import { NAME_PAGE, LAYOUT_ADMIN_PAGE_PROFILE, LAYOUT_ADMIN_PAGE_MOD, LAYOUT_ADMIN_PAGE_LOGOUT } from '@layout/const/layouts.const'

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
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
  public LAYOUT_ADMIN_PAGE_PROFILE = LAYOUT_ADMIN_PAGE_PROFILE;
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
    localStorage.removeItem(STORAGE_KEY_TOKEN)
    this.router.navigate([LAYOUT_ADMIN_PAGE_LOGOUT]);
  }

  mostrarMenuLateral(){
    this.minimizarSliderbar = !this.minimizarSliderbar
  }

}
