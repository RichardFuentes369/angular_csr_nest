import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

import { Config } from 'datatables.net';

import { TablecrudService } from './service/tablecrud.service';

import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';

import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-globales-tablecrud',
  standalone: true,
  imports: [
    DataTablesModule,
    TranslateModule
  ],
  templateUrl: './tablecrud.component.html',
  styleUrl: './tablecrud.component.scss',
})
export class TablecrudComponent implements OnInit {
  @Input()
  campoFiltro: boolean = false;
  @Input()
  endPoint: string = '';
  @Input()
  filters: string = '';
  @Input()
  columnas: any;
  @Input()
  permisosAcciones: any[] = [];

  url = environment.apiUrl
  idsSeleccionados: any[] = [];

  constructor(
    private tableCrudService: TablecrudService,
    private http: HttpClient
  ) {}

  @ViewChild(DataTableDirective, { static: false }) datatableElement!: DataTableDirective;
  dtOptions: Config = {};

  ngOnInit() {
    this.listar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.datatableElement.dtInstance.then((dtInstance: any) => {
      dtInstance.ajax.reload();
    });
  }

  tienePermiso(nombre: string): boolean {
    return this.permisosAcciones.some((permiso) => permiso.permiso_permiso === nombre);
  }

  listar() {
    this.dtOptions = {
      paging: true,
      scrollY: '400',
      ordering: false,
      processing: true,
      searching: false,
      serverSide: true, // Set the flag
      ajax: (dataTablesParameters: any, callback) => {
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        dataTablesParameters.PageNo = page.toString();
        dataTablesParameters.NoOfRows = dataTablesParameters.length.toString();

        this.http.get<any[]>(
            `${this.url}${this.endPoint}?page=${page}&limit=${dataTablesParameters.length}&field=id&order=asc${this.filters}`
        ).subscribe((post) => {
          const recordsTotal = post[0].pagination.totalRecord;
          
          const data: any = [];

          for (const item of post[0].result) {
            (this.idsSeleccionados.find(obj => obj == item.id)) ? item.selection = true : item.selection = false
            data.push(item);
          }

          callback({
            recordsTotal: recordsTotal,
            recordsFiltered: recordsTotal,
            data: data,
          });
        });
      },
      language: {
        "searchPlaceholder": "Buscar..",
        "processing": "Procesando...",
        "lengthMenu": "Mostrar _MENU_ registros",
        "zeroRecords": "No se encontraron resultados",
        "emptyTable": "Ningún dato disponible en esta tabla",
        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
        "search": "Buscar:",
        "loadingRecords": "Cargando...",
        "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        "aria": {
            // "sortAscending": ": Activar para ordenar la columna de manera ascendente",
            // "sortDescending": ": Activar para ordenar la columna de manera descendente"
        },
        "decimal": ",",
        "thousands": ".",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
      },
      columns: this.columnas,
      rowCallback: (row: Node, data: any | Object, index: number) => {

        const self = $(this);

        if (data.selection === true) {
          self.css({'background-color': 'red', 'color': 'white'});
        } else {
          self.css({'background-color': '', 'color': 'black'}); 
        }

        $('td', row).on('click', () => {

          const exist = this.idsSeleccionados.find(obj => obj == data.id)
          const existIndex = this.idsSeleccionados.findIndex(obj => obj == data.id)

          if(exist){
            this.idsSeleccionados.splice(existIndex,1)
            $('tr').eq(index+2).css({'background-color':'','color':'black'});
          }
          
          if(!exist){
            this.idsSeleccionados.push(data.id)
            $('tr').eq(index+2).css({'background-color':'red','color':'white'});
          }
        });
      
        return row;
      }
    };
  }

  limpiarSeleccion(){
    this.idsSeleccionados = []
    $('tr').css({'background-color':'','color':'black'});
  }

  reload(){
    this.limpiarSeleccion()
    this.datatableElement.dtInstance.then((dtInstance: any) => {
      dtInstance.ajax.reload();
    });
  }

  @Output()
  verItem = new EventEmitter<string>()
  seeItem (){
    if(this.idsSeleccionados.length == 1){
      this.verItem.emit(this.idsSeleccionados[0])
    }
  }

  @Output()
  crearNuevoItem = new EventEmitter<string>()
  newItem (){
    if(this.idsSeleccionados.length == 0){
      this.crearNuevoItem.emit()
    }
  }

  @Output()
  editarItem = new EventEmitter<string>()
  editItem (){
    if(this.idsSeleccionados.length == 1){
      this.editarItem.emit(this.idsSeleccionados[0])
    }
  }

  @Output()
  eliminarItem = new EventEmitter<string[]>()
  deleteItem (){
    if(this.idsSeleccionados.length > 0){
      this.eliminarItem.emit(this.idsSeleccionados)
    }
  }

  @Output()
  activarItem = new EventEmitter<string[]>()
  activedItem (){
    if(this.idsSeleccionados.length > 0){
      this.activarItem.emit(this.idsSeleccionados)
    }
  }

  @Output()
  asignar = new EventEmitter<string>()
  assignItem (){
    this.asignar.emit(this.idsSeleccionados[0])
  }
  
  selectionClear (){
    this.idsSeleccionados = []
    $('tr').css({'background-color':'','color':'black'});
  }

}
