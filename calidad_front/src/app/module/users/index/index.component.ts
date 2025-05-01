import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PipesModule } from '@pipe/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { Permisos } from '@functions/System'

import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';


@Component({
  selector: 'app-menu-usuarios-index',
  standalone: true,
  imports: [CommonModule, PipesModule, TranslateModule],
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
    const modulo = await this.permisosService.permisos(userData.data.id,'usuarios')
    this.menu = modulo.data
  }

  tienePermiso(nombre: string): boolean {
    return this.menu.some((permiso) => permiso.permiso_nombre_permiso === nombre);
  }

  goTo(url: string){
    this.router.navigate([window.location.pathname+'/'+url]);
  }


}
