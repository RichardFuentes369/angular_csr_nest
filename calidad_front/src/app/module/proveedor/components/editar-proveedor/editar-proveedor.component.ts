import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '@module/proveedor/index/service/proveedor.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

interface ProveedorInterface {
  "razonSocial": string,
  "telefono": string,
  "email": string,
  "estado": string,
  "nit": string
}

@Component({
  selector: 'app-editar-proveedor',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './editar-proveedor.component.html',
  styleUrl: './editar-proveedor.component.scss'
})
export class EditarProveedorComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private proveedorService :ProveedorService,
    private translate: TranslateService
  ) { }

  model = {
    id: '',
    razonSocial: '',
    telefono: '',
    email: '',
    estado: '',
    nit: ''
  }

  proveedor: ProveedorInterface[] = []
  proveedorReal: any

  async ngOnInit() {
    this.proveedor = []

    this.proveedorReal = await this.proveedorService.getDataSupplier(this.route.snapshot.queryParams?.['id'])

    this.proveedor.push(this.proveedorReal.data)

    this.model.id = this.proveedorReal.data.id
    this.model.razonSocial = this.proveedorReal.data.razonSocial
    this.model.telefono = this.proveedorReal.data.telefono
    this.model.email = this.proveedorReal.data.email
    this.model.estado = this.proveedorReal.data.estado
    this.model.nit = this.proveedorReal.data.nit
  }

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  actualizarData(){
    this.proveedorService.updateSupplier(
      {
        "razonSocial": this.model.razonSocial,
        "telefono": this.model.telefono,
        "email": this.model.email,
        "estado": this.model.estado,
        "nit": this.model.nit
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
