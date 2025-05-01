import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZonaComunService } from '@module/zonaComun/index/service/zona-comun.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

interface ZonaInterface {
  "nombre": string,
  "ubicacion": string,
  "descripcion": string
}


@Component({
  selector: 'app-editar-zona',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './editar-zona.component.html',
  styleUrl: './editar-zona.component.scss'
})
export class EditarZonaComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private zonaComunService :ZonaComunService,
    private translate: TranslateService
  ) { }

  model = {
    id: '',
    nombre: '',
    ubicacion: '',
    descripcion: ''
  }

  zona: ZonaInterface[] = []
  zonaReal: any

  async ngOnInit() {
    this.zona = []

    this.zonaReal = await this.zonaComunService.getDataZone(this.route.snapshot.queryParams?.['id'])

    this.zona.push(this.zonaReal.data)

    this.model.id = this.zonaReal.data.id
    this.model.nombre = this.zonaReal.data.nombre
    this.model.ubicacion = this.zonaReal.data.ubicacion
    this.model.descripcion = this.zonaReal.data.descripcion
  }

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  actualizarData(){
    this.zonaComunService.updateZona(
      {
        "nombre": this.model.nombre,
        "descripcion": this.model.descripcion,
        "ubicacion": this.model.ubicacion,
      },
      this.model.id
    ).then((response) =>{
      this.translate.get('pages-zonaComun.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
        Swal.fire(
          this.translate.instant('pages-zonaComun.Swal.TitleRegisterUpdated')
        );
      })
    }).catch(async error => {
      this.ngOnInit()
      if(typeof(error.response.data.message) == 'string'){
        Swal.fire(error.response.data.message);
      }else{
        Swal.fire(error.response.data.message[0]);
      }
    })
  }
}
