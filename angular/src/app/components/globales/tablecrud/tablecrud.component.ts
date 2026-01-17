import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { Config } from 'datatables.net';

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
export class TablecrudComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() campoFiltro: boolean = false;
  @Input() endPoint: string = '';
  @Input() filters: string = '';
  @Input() columnas: any;
  @Input() permisosAcciones: any[] = [];

  @ViewChild(DataTableDirective, { static: false }) datatableElement!: DataTableDirective;

  url = environment.apiUrl;
  idsSeleccionados: any[] = [];
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  private langSub: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.listar();

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.recargarIdioma();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange) {
      this.reload();
    }
  }

  ngOnDestroy() {
    if (this.langSub) this.langSub.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  recargarIdioma() {
    this.datatableElement.dtInstance.then((dtInstance: any) => {
      dtInstance.destroy();
      this.listar();
      this.dtTrigger.next(null);
    });
  }

  listar() {
    this.dtOptions = {
      paging: true,
      scrollY: '400',
      ordering: false,
      processing: true,
      searching: false,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
        const page = Math.floor(dataTablesParameters.start / dataTablesParameters.length) + 1;
                
        this.http.get<any[]>(
          `${this.url}${this.endPoint}?page=${page}&limit=${dataTablesParameters.length}&field=id&order=asc${this.filters}&lang=${lang}`
        ).subscribe((post) => {
          const recordsTotal = post[0].pagination.totalRecord;
          const data = post[0].result.map((item: any) => {
            item.selection = this.idsSeleccionados.includes(item.id);
            return item;
          });

          callback({
            recordsTotal: recordsTotal,
            recordsFiltered: recordsTotal,
            data: data,
          });
        });
      },
      language: {
        "processing": "Procesando...",
        "lengthMenu": `${this.translate.instant('global-tablecrud.TABLE_INFO_SHOW')} _MENU_ ${this.translate.instant('global-tablecrud.TABLE_INFO_RECORDS')}`,
        "zeroRecords": "No se encontraron resultados",
        "emptyTable": `${this.translate.instant('global-tablecrud.TABLE_INFO_NO_INFO')}`,
        "info": `${this.translate.instant('global-tablecrud.TABLE_INFO_SHOWING')} _START_ ${this.translate.instant('global-tablecrud.TABLE_INFO_TO')} _END_ ${this.translate.instant('global-tablecrud.TABLE_INFO_OF')} _TOTAL_ ${this.translate.instant('global-tablecrud.TABLE_INFO_ENTRIES')}`,
        "infoEmpty": `${this.translate.instant('global-tablecrud.TABLE_INFO_SHOWING')} _START_ ${this.translate.instant('global-tablecrud.TABLE_INFO_TO')} _END_ ${this.translate.instant('global-tablecrud.TABLE_INFO_OF')} _TOTAL_ ${this.translate.instant('global-tablecrud.TABLE_INFO_ENTRIES')}`,
        "paginate": {
          "first": `${this.translate.instant('global-tablecrud.TABLE_INFO_FIRST')}`,
          "last": `${this.translate.instant('global-tablecrud.TABLE_INFO_LAST')}`,
          "next": `${this.translate.instant('global-tablecrud.TABLE_INFO_NEXT')}`,
          "previous": `${this.translate.instant('global-tablecrud.TABLE_INFO_PREVIOUS')}`
        },
        "decimal": ",",
        "thousands": "."
      },
      columns: this.columnas,
      rowCallback: (row: Node, data: any, index: number) => {
        const $row = $(row);
        if (this.idsSeleccionados.includes(data.id)) {
          $row.addClass('selected-row');
        } else {
          $row.removeClass('selected-row');
        }
        $('td', row).off('click').on('click', () => {
          const existIndex = this.idsSeleccionados.indexOf(data.id);
          if (existIndex !== -1) {
            this.idsSeleccionados.splice(existIndex, 1);
            $row.removeClass('selected-row');
          } else {
            this.idsSeleccionados.push(data.id);
            $row.addClass('selected-row');
          }
        });
        return row;
      }
    };
  }

  reload() {
    this.limpiarSeleccion();
    this.datatableElement.dtInstance.then((dtInstance: any) => {
      dtInstance.ajax.reload();
    });
  }

  limpiarSeleccion() {
    this.idsSeleccionados = [];
    $('.tableDatatable tbody tr').removeClass('selected-row');
  }

  tienePermiso(nombre: string): boolean {
    return this.permisosAcciones?.some((permiso) => permiso.permiso_permiso === nombre);
  }

  // Outputs y métodos Emitters (abreviados para el ejemplo)
  @Output() verItem = new EventEmitter<string>();
  @Output() crearNuevoItem = new EventEmitter<string>();
  @Output() editarItem = new EventEmitter<string>();
  @Output() eliminarItem = new EventEmitter<string[]>();
  @Output() activarItem = new EventEmitter<string[]>();
  @Output() asignar = new EventEmitter<{ id: string, ctrlKey: boolean }>();

  newItem() { if (this.idsSeleccionados.length === 0) this.crearNuevoItem.emit(); }
  seeItem() { if (this.idsSeleccionados.length === 1) this.verItem.emit(this.idsSeleccionados[0]); }
  editItem() { if (this.idsSeleccionados.length === 1) this.editarItem.emit(this.idsSeleccionados[0]); }
  deleteItem() { if (this.idsSeleccionados.length > 0) this.eliminarItem.emit(this.idsSeleccionados); }
  activedItem() { if (this.idsSeleccionados.length > 0) this.activarItem.emit(this.idsSeleccionados); }
  assignItem(event: MouseEvent) {
    if (this.idsSeleccionados.length === 1) {
      this.asignar.emit({
        id: this.idsSeleccionados[0],
        ctrlKey: event.ctrlKey || event.metaKey
      });
    }
  }
  selectionClear() { this.limpiarSeleccion(); }
}