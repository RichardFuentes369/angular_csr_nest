import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PrincipalService } from '../../principal/service/principal.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { AuthService } from '@guard/service/auth.service';

import { Permisos } from '@functions/System'
import { FinalService } from '../../finales/service/final.service';

interface AdministradorInterface {
  'id': number,
  'firstName': string,
  'lastName': string,
  'email': string,
  'password': string,
  'isActive': boolean,
}

@Component({
  selector: 'app-ver-usuarios',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.scss'
})
export class VerUsuariosComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private userPrincipalService :PrincipalService,
    private userFinalService :FinalService
  ) { }

  user: AdministradorInterface[] = []
  permisos: any[] = []
  usuarioReal: any

  async ngOnInit() {
    await this.userService.refreshToken('authadmin');

    switch (this.route.snapshot.queryParams?.['rol']) {
      case 'admin':
        this.usuarioReal = await this.userFinalService.getDataUser(
          this.route.snapshot.queryParams?.['id']
          )
        break;
      case 'user':
        this.usuarioReal = await this.userPrincipalService.getDataUser(
          this.route.snapshot.queryParams?.['id']
        )
        break;
    }

    this.user.push(this.usuarioReal.data)
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
