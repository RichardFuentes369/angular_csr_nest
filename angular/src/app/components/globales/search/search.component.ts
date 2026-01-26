import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ListaComponentes } from '@mod/lista-componentes'

@Component({
  selector: 'app-globales-search',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent{
  @ViewChild('contenedorFilter', { read: ViewContainerRef }) contenedorDinamico!: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private translate: TranslateService
  ) {}

  listaDeComponentes = new ListaComponentes();

  @Input()
  icon: string = 'fa fa-filter';  
  @Input()
  componente: string = '';  
  
  isFilterVisible: boolean = false;
  clickeado:boolean = false

  @Output()
  filtroItem = new EventEmitter<string>()

  async openFilterMinimize() {
    let componente = await this.listaDeComponentes.obtenerComponentePorNombre(this.componente);
    
    if(componente){
      const factory = await this.resolver.resolveComponentFactory(componente.componente);
      this.clickeado = !this.clickeado
      if(this.clickeado == true){
        this.contenedorDinamico.clear()
        this.contenedorDinamico.createComponent(factory);
        this.isFilterVisible = true
      }else{
        this.filtroItem.emit()
        this.isFilterVisible = false
      }
    }else{
      const mensaje = this.translate.instant('global-search.CONSOLE_ERROR_NOT_FOUND_COMPONENT')
      console.error(mensaje)
    }
  }  

  async clearFilter(){
    $('.limpiar').click()
    this.filtroItem.emit()
  }
  
  async closeFilterEraser(){
    $('.limpiar').click()
    this.clickeado = !this.clickeado
    this.filtroItem.emit()
    this.isFilterVisible = false
  }

  async actionFilter(){
    $('.filtrar').click()
    this.filtroItem.emit()
  }

}
