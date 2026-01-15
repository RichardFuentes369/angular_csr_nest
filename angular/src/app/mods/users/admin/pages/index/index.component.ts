
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { _PAGE_WITHOUT_PERMISSION_ADMIN } from '@const/app.const';
import { MOD_USER_PAGE_ADMIN, MOD_USER_PAGE_FINAL } from '@mod/users/const/users.const';


@Component({
  selector: 'app-menu-usuarios-index',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{

  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService
  ) { }


  public MOD_USER_PAGE_ADMIN = MOD_USER_PAGE_ADMIN
  public MOD_USER_PAGE_FINAL = MOD_USER_PAGE_FINAL

  menu: any[] = []

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH)
    const submodulo = await this.permisosService.permisoPage(0,'usuarios',userData.data.id)
    console.log(submodulo)
    if (submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    } 

    const modulo = await this.permisosService.permisos(userData.data.id,'usuarios')
    this.menu = modulo.data
  }

  tienePermiso(nombre: string): boolean {
    return this.menu.some((permiso) => permiso.permiso_permiso === nombre);
  }

}
