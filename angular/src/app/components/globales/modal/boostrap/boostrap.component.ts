import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, Output, EventEmitter, Renderer2 } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ListaComponentes } from '@mod/lista-componentes'
import { WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';

@Component({
  selector: 'app-globales-modal-boostrap',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './boostrap.component.html',
  styleUrl: './boostrap.component.scss'
})
export class ModalBoostrapComponent {

  @ViewChild('contenedor', { read: ViewContainerRef, static: true }) contenedor!: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private translate: TranslateService,
    private renderer: Renderer2 // Añadido para mover el modal al body
  ) {}

  listaDeComponentes = new ListaComponentes();

  async openModal() {
    // 1. Lógica original para cargar el componente dinámico
    const boton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL) as HTMLButtonElement
    const metodoClickeado = boton.getAttribute(WORD_KEY_COMPONENT_GLOBAL)
    
    if(metodoClickeado){
      let componente = await this.listaDeComponentes.obtenerComponentePorNombre(metodoClickeado);
      const factory = this.resolver.resolveComponentFactory(componente.componente);
      this.contenedor.clear()
      this.contenedor.createComponent(factory);

      // 2. SOLUCIÓN AL PROBLEMA DE LA CAPA OSCURA:
      // Movemos el modal al final del body para que salga del contexto de scroll
      const modalElement = document.getElementById('staticBackdrop');
      if (modalElement) {
        this.renderer.appendChild(document.body, modalElement);
      }
    } else {
      const mensaje = this.translate.instant('global-modal.CONSOLE_ERROR_NOT_FOUND_COMPONENT')
      console.error(mensaje)
    }
  }

  @Output() actualizarTabla = new EventEmitter<string>()

  async buttonSaveM(){
    const boton = document.querySelector('.btnAction') as HTMLButtonElement
    if(boton){
      await boton.click()
      this.actualizarTabla.emit()
    }
  }

  async buttonUpdateM(){
    const boton = document.querySelector('.btnAction') as HTMLButtonElement
    if(boton){
      await boton.click()
      this.actualizarTabla.emit()
    }
  }

  async buttonCloseM(){
    // Bootstrap maneja el cierre, pero puedes limpiar aquí si es necesario
  }

  @Input() tamano: string = '';
  @Input() scrollable: boolean = false;
  @Input() title: string = '';
  @Input() cancel: boolean = false;
  @Input() buttonCancel: string = '';
  @Input() save: boolean = false;
  @Input() buttonSave: string = '';
  @Input() edit: boolean = false;
  @Input() buttonEdit: string = '';
  @Input() componentePrecargado: string = '';
  @Input() cierreModal: string = "static";
}