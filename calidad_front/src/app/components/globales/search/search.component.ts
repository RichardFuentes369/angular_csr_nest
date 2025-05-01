import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ListaComponentes } from '@module/lista-componentes'

@Component({
  selector: 'app-globales-search',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent{
  @ViewChild('contenedorFilter', { read: ViewContainerRef }) contenedorDinamico!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  listaDeComponentes = new ListaComponentes();

  @Input()
  icon: string = 'fa fa-filter';  
  @Input()
  componente: string = '';  
  
  isFilterVisible: boolean = false;
  clickeado:boolean = false

  @Output()
  filtroItem = new EventEmitter<string>()

  async openFilter() {
    let componente = await this.listaDeComponentes.obtenerComponentePorNombre(this.componente);
    
    if(componente){
      const factory = await this.resolver.resolveComponentFactory(componente.componente);
      this.contenedorDinamico.clear()
      this.contenedorDinamico.createComponent(factory);
      
      this.clickeado = !this.clickeado
      if(this.clickeado == true){
        this.isFilterVisible = true
      }else{
        this.filtroItem.emit()
        this.isFilterVisible = false
      }
    }else{
      console.log('componente no encontrado')
    }

  }  

  async limpiar(){
    $('.limpiar').click()
    this.filtroItem.emit()
  }
  async filtrar(){
    $('.filtrar').click()
    this.filtroItem.emit()
  }

}
