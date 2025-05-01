import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PipesModule } from '@pipe/pipes.module';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';

import Swal from 'sweetalert2'

import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';

import { MantenimientoService } from '../index/service/mantenimiento.service';
import { CrearHistoricoComponent } from '../components/crear-historico/crear-historico.component';

@Component({
  selector: 'app-mantenimiento-historico',
  standalone: true,
  imports: [
    CommonModule, 
    PipesModule, 
    TranslateModule,
    TablecrudComponent,
    CrearHistoricoComponent,
    ModalBoostrapComponent,
  ],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent implements OnInit {

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private mantenimientoService :MantenimientoService,
    private translate: TranslateService
  ) { }

  permisos: any[] = []
  endPointReal = `orden-historico/${this.route.snapshot.queryParams?.['id']}`

  async ngOnInit() {
    await this.userService.refreshToken('authadmin');
    const userData = await this.userService.getUser('authadmin');
    const modulo = await this.permisosService.permisos(userData.data.id,'historico')
    this.permisos = modulo.data
  }

  // inicio datos que envio al componente tabla
  columnas = [
    {
      title: 'ID',
      data: 'id',
    },
    {
      title: 'Observation',
      data: 'observacion',
    },
    {
      title: 'Price',
      data: 'precio',
    },
    {
      title: 'Supplier',
      data: 'proveedor.razonSocial',
    },
    {
      title: 'Created_at',
      data: 'fecha_creacion',
    }
  ]
  permisosAcciones = this.permisos
  // fin datos que envio al componente tabla

  tamano = ""
  scrollable = false
  title = ""
  save = true
  buttonSave = "Guardar"
  edit = true
  buttonEdit = "Editar"
  cancel = true
  buttonCancel = "Cancelar"
  cierreModal = "true"
  componentePrecargado = ""

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent

  async refrescarTabla (){
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }

  eliminarData (_id: string){
    console.log("eliminarData "+_id)
    this.translate.get('pages-mantenimiento.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('pages-mantenimiento.Swal.TitleWarnigRevert'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('pages-mantenimiento.Swal.TitleDelete'),
        cancelButtonText: this.translate.instant('pages-mantenimiento.Swal.TitleCancel')
      }).then(async (result) => {
        if (result.isConfirmed) {
            if (result.isConfirmed) {
              await this.mantenimientoService.deleteHistorico(_id)
              await this.someInput.reload()
              Swal.fire({
                title: this.translate.instant('pages-mantenimiento.Swal.TitleDelete'),
                text: this.translate.instant('pages-mantenimiento.Swal.TitleRegisterDeleted'),
                icon: "success"
              });
            }
        }
      });
    });
  }
}

