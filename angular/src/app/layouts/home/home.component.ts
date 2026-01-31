import { Component, Renderer2, HostListener, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { IdiomaComponent } from '@component/globales/idioma/idioma.component';
import { Router, NavigationEnd, Event, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

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
export class HomeComponent implements OnInit{

  public CURRENT_YEAR = new Date().getFullYear();
  public NAME_PAGE = NAME_PAGE;
  public LAYOUT_HOME_PAGE_START = LAYOUT_HOME_PAGE_START;
  public LAYOUT_HOME_PAGE_LOGIN_FINAL = LAYOUT_HOME_PAGE_LOGIN_FINAL;

  showRouteIngreso: boolean = true

  constructor(private translate: TranslateService,private router: Router) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
  }

  ngOnInit() {
    this.verificarRuta(this.router.url);
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.verificarRuta(event.urlAfterRedirects);
    });
  }

  private verificarRuta(url: string) {
    this.showRouteIngreso = !url.includes('ingreso/admin');
  }

  minimizarSliderbar: boolean = false;

  mostrarMenuLateral(){
    this.minimizarSliderbar = !this.minimizarSliderbar
  }

  idiomaCambiar(valor: string){
    this.translate.use(valor)
  }


}
