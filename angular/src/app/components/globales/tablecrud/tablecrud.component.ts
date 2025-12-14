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
  idSeleccionado: string = '';

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
        // dataTablesParameters.SearchValue = dataTablesParameters.search.value;
        // dataTablesParameters.sortHeader = this.sortHeader;
        // dataTablesParameters.sortOrder = dataTablesParameters.order[0].dir;

        this.http.get<any[]>(
            `${this.url}${this.endPoint}?page=${page}&limit=${dataTablesParameters.length}&field=id&order=asc${this.filters}`
        ).subscribe((post) => {
          const recordsTotal = post[0].pagination.totalRecord;
          const recordsFiltered = post.length;

          function capitalizeFirstLetter(texto: string) {
            return texto.charAt(0).toUpperCase() + texto.slice(1);
          }


          this.idSeleccionado = ''
          const data: any = [];

          for (const item of post[0].result) {
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
        const self = this;
        $('td', row).on('click', () => {
          this.idSeleccionado = ''
          $('tr').css({'background-color':'','color':'black'});

          this.idSeleccionado = data.id
          $('tr').eq(index+2).css({'background-color':'red','color':'white'});
        });
        return row;
      }
    };
  }

  limpiarSeleccion(){
    this.idSeleccionado = ''
    $('tr').css({'background-color':'','color':'black'});
  }

  reload(){
    this.datatableElement.dtInstance.then((dtInstance: any) => {
      dtInstance.ajax.reload();
    });
  }

  @Output()
  verItem = new EventEmitter<string>()
  seeItem (){
    this.verItem.emit(this.idSeleccionado)
  }

  @Output()
  crearNuevoItem = new EventEmitter<string>()
  newItem (){
    this.crearNuevoItem.emit(this.idSeleccionado)
  }

  @Output()
  editarItem = new EventEmitter<string>()
  editItem (){
    this.editarItem.emit(this.idSeleccionado)
  }

  @Output()
  eliminarItem = new EventEmitter<string>()
  deleteItem (){
    this.eliminarItem.emit(this.idSeleccionado)
  }

  @Output()
  activarItem = new EventEmitter<string>()
  activedItem (){
    this.activarItem.emit(this.idSeleccionado)
  }

  @Output()
  asignar = new EventEmitter<string>()
  assignItem (){
    this.asignar.emit(this.idSeleccionado)
  }

  @Output()
  historicoItem = new EventEmitter<string>()
  historyItem (){
    this.historicoItem.emit(this.idSeleccionado)
  }
  
  selectionClear (){
    this.idSeleccionado = ''
    $('tr').css({'background-color':'','color':'black'});
  }

}
