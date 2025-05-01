import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProveedorService } from '@module/proveedor/index/service/proveedor.service';
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@functions/System'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-proveedor',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule],
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.scss'
})
export class CrearProveedorComponent {

  constructor(
    private router: Router,
    private proveedorService: ProveedorService,
    private translate: TranslateService
  ){}

  model = {
    razonSocial: '',
    telefono: '',
    email: '',
    estado: '',
    nit: ''
  }

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  async crearProveedor(){

    this.model.estado = (this.model.estado == "true") ? 'Activo':'Inactivo' 

    await this.proveedorService.createSupplier(this.model)
    .then(response=>{
      ocultarModalOscura()
      this.translate.get('pages-proveedor.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
        localStorage.removeItem('profile')
        Swal.fire({
          title: this.translate.instant('pages-proveedor.Swal.TitleCreate'),
          text: this.translate.instant('pages-proveedor.Swal.TitleRegisterCreate'),
          icon: "success"
        });
      });
    }).catch(err =>{
      console.log(err)
      Swal.fire({
        title: err.response.data.message,
        text: err.response.data.error,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    })

  }
}
