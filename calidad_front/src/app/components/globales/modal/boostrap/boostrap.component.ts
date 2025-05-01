import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit, Output, EventEmitter } from '@angular/core';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { TranslateModule } from '@ngx-translate/core';

import { ListaComponentes } from '@module/lista-componentes'


@Component({
  selector: 'app-globales-modal-boostrap',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    LoadingComponent
  ],
  templateUrl: './boostrap.component.html',
  styleUrl: './boostrap.component.scss'
})

export class ModalBoostrapComponent {

  @ViewChild('contenedor', { read: ViewContainerRef, static: true }) contenedor!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  listaDeComponentes = new ListaComponentes();

  async openModal() {
    const boton = document.getElementById('miBoton') as HTMLButtonElement
    const metodoClickeado = boton.getAttribute('componente')
    if(metodoClickeado){
      let componente = await this.listaDeComponentes.obtenerComponentePorNombre(metodoClickeado);
      const factory = await this.resolver.resolveComponentFactory(componente.componente);
      this.contenedor.clear()
      this.contenedor.createComponent(factory);
    }else{
      console.log('componente no encontrado')
    }
  }

  @Output()
  actualizarTabla = new EventEmitter<string>()
  async buttonSaveM(){
    const boton = document.querySelector('.btnAction') as HTMLButtonElement
    if(boton){
      await boton.click()
      await this.actualizarTabla.emit()
    }
  }
  async buttonCloseM(){
    await this.actualizarTabla.emit()
  }
  async buttonUpdateM(){
    const boton = document.querySelector('.btnAction') as HTMLButtonElement
    if(boton){
      await boton.click()
      await this.actualizarTabla.emit()
    }
  }

  @Input()
  tamano: string = '';
  @Input()
  scrollable: boolean = false;
  @Input()
  title: string = '';
  @Input()
  cancel: boolean = false;
  @Input()
  buttonCancel: string = '';
  @Input()
  save: boolean = false;
  @Input()
  buttonSave: string = '';
  @Input()
  edit: boolean = false;
  @Input()
  buttonEdit: string = '';
  @Input()
  componentePrecargado: string = '';
  @Input()
  cierreModal: string = "static";
}
