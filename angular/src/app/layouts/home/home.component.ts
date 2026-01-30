import { Component, Renderer2, HostListener, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { IdiomaComponent } from '@component/globales/idioma/idioma.component';
import { RouterModule } from '@angular/router';

import { NAME_PAGE, LAYOUT_HOME_PAGE_START, LAYOUT_HOME_PAGE_LOGIN_FINAL } from '@layout/const/layouts.const';
import { ColormodeComponent } from '@component/globales/colormode/colormode.component';

@Component({
  selector: 'app-layout-home',
  standalone: true,
  imports: [
    IdiomaComponent,
    TranslateModule,
    ColormodeComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public CURRENT_YEAR = new Date().getFullYear();
  public NAME_PAGE = NAME_PAGE;
  public LAYOUT_HOME_PAGE_START = LAYOUT_HOME_PAGE_START;
  public LAYOUT_HOME_PAGE_LOGIN_FINAL = LAYOUT_HOME_PAGE_LOGIN_FINAL;

  constructor(private renderer: Renderer2, private translate: TranslateService,) {}

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.responsiveMenu()
  }

  ngOnInit(event:any) {
    this.responsiveMenu()
  }

  responsiveMenu(){
    if(window.innerWidth <= 991){
      const elements = document.querySelectorAll('.menuIndex');
      elements.forEach(element => {
        this.renderer.removeClass(element, 'borde-menu');
      });

      const container = document.querySelectorAll('.navbarPersonalizado');
      container.forEach(element => {
        this.renderer.removeClass(element, 'row');
      });
    }else{
      const elements = document.querySelectorAll('.menuIndex');
      elements.forEach(element => {
        this.renderer.addClass(element, 'borde-menu');
      });

      const container = document.querySelectorAll('.navbarPersonalizado');
      container.forEach(element => {
        this.renderer.addClass(element, 'row');
      });
    }
  }

  minimizarSliderbar: boolean = false;

  mostrarMenuLateral(){
    this.minimizarSliderbar = !this.minimizarSliderbar
  }

  idiomaCambiar(valor: string){
    this.translate.use(valor)
  }


}
