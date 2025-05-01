import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { ProveedorService } from '@module/proveedor/index/service/proveedor.service';
import { TranslateModule } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';


interface ProveedorInterface {
  "razonSocial": string,
  "telefono": string,
  "email": string,
  "estado": string,
  "nit": string
}

@Component({
  selector: 'app-ver-proveedor',
    standalone: true,
    imports: [CommonModule, TranslateModule],
  templateUrl: './ver-proveedor.component.html',
  styleUrl: './ver-proveedor.component.scss'
})
export class VerProveedorComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private proveedorService :ProveedorService
  ) { }

  proveedor: ProveedorInterface[] = []
  permisos: any[] = []
  proveedorReal: any

  async ngOnInit() {
    await this.userService.refreshToken('authadmin');

    this.proveedorReal = await this.proveedorService.getDataSupplier(
      this.route.snapshot.queryParams?.['id']
    )

    this.proveedor.push(this.proveedorReal.data)
  }

  tienePermiso(nombre: string): boolean {
    return this.permisos.some((permiso) => permiso === nombre);
  }

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

}
