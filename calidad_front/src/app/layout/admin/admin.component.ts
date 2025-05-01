import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import Swal from 'sweetalert2'
import { BreadcrumbsComponent } from '@component/globales/breadcrumb/breadcrumb.component';
import { IdiomaComponent } from '@component/globales/idioma/idioma.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
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
    localStorage.removeItem('token')
    this.router.navigate(['/inicio/ingreso/admin']);
  }

  mostrarMenuLateral(){
    this.minimizarSliderbar = !this.minimizarSliderbar
  }

}
