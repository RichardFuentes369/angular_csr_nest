
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { Permisos } from '@function/System'

import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';


@Component({
  selector: 'app-menu-usuarios-index',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{

  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService
  ) { }

  menu: any[] = []

  async ngOnInit() {
    const userData = await this.userService.getUser('authadmin')
    const submodulo = await this.permisosService.permisoPage(0,'usuarios',userData.data.id)
    console.log(submodulo)
    if (submodulo.data === "") {
      this.router.navigate(['/admin/permiso']);
    } 

    const modulo = await this.permisosService.permisos(userData.data.id,'usuarios')
    this.menu = modulo.data
  }

  tienePermiso(nombre: string): boolean {
    return this.menu.some((permiso) => permiso.permiso_permiso === nombre);
  }

  goTo(url: string){
    this.router.navigate([window.location.pathname+'/'+url]);
  }


}
