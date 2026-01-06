
import { Router } from '@angular/router'
import { Component, OnInit, Pipe } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';

import { TranslateModule } from '@ngx-translate/core';
import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_TOKEN } from '@const/app.const';
import { ADMIN_PAGE_MENU_PERSMISSION_USERS, ADMIN_PAGE_MENU_PERSMISSION_MODULES, LAYOUT_ADMIN_PAGE_USERS, LAYOUT_ADMIN_PAGE_MODULES } from '@mod/main/const/main.const';

@Component({
  selector: 'app-mod-menu-admin',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuAdminComponent implements OnInit{

  constructor(
    private router: Router,
    private userService: AuthService,
    private permisosService :PermisosService
  ) { }

  public ADMIN_PAGE_MENU_PERSMISSION_USERS = ADMIN_PAGE_MENU_PERSMISSION_USERS
  public ADMIN_PAGE_MENU_PERSMISSION_MODULES = ADMIN_PAGE_MENU_PERSMISSION_MODULES
  public LAYOUT_ADMIN_PAGE_USERS = LAYOUT_ADMIN_PAGE_USERS
  public LAYOUT_ADMIN_PAGE_MODULES = LAYOUT_ADMIN_PAGE_MODULES

  menu: any[] = []

  async ngOnInit() {

    for (const key in localStorage) {
      if (key != STORAGE_KEY_TOKEN) {
        delete localStorage[key];
      }
    }

    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH)
    const response = await this.permisosService.permisos(userData.data.id, '')
    this.menu = response.data
  }

  tienePermiso(nombre: string): boolean {
    return this.menu.some((permiso) => permiso.permiso_permiso === nombre);
  }

}
