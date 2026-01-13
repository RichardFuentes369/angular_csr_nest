import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_TOKEN_ADMIN } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';

@Component({
  selector: 'app-mod-admin-final-pages-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class MeAdminPageProfileComponent {

  constructor(
    private router: Router,
    private userService: AuthService,
    private permisosService :PermisosService
  ) { }

  async ngOnInit() {

    for (const key in localStorage) {
      if (key != STORAGE_KEY_TOKEN_ADMIN) {
        delete localStorage[key];
      }
    }

    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH)
    const response = await this.permisosService.permisos(userData.data.id, '')
  }

}
