import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { Component, OnInit, Pipe } from '@angular/core';

import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  constructor(
    private router: Router,
    private userService: AuthService,
    private permisosService :PermisosService
  ) { }

  menu: any[] = []

  async ngOnInit() {

    for (const key in localStorage) {
      if (key != 'token') {
        delete localStorage[key];
      }
    }

    const userData = await this.userService.getUser('authadmin')
    const response = await this.permisosService.permisos(userData.data.id, '')
    this.menu = response.data
  }

  tienePermiso(nombre: string): boolean {
    return this.menu.some((permiso) => permiso.permiso_nombre_permiso === nombre);
  }

  goTo(url: string){
    this.router.navigate([window.location.pathname+url]);
  }

}
