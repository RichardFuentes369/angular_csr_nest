import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { ZonaComunService } from '@module/zonaComun/index/service/zona-comun.service';
import { TranslateModule } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';


interface ZonaInterface {
  "nombre": string,
  "ubicacion": string,
  "descripcion": string
}

@Component({
  selector: 'app-ver-zona',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './ver-zona.component.html',
  styleUrl: './ver-zona.component.scss'
})
export class VerZonaComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private zonaComunService :ZonaComunService
  ) { }

  zona: ZonaInterface[] = []
  permisos: any[] = []
  zonaReal: any

  async ngOnInit() {
    await this.userService.refreshToken('authadmin');

    this.zonaReal = await this.zonaComunService.getDataZone(
      this.route.snapshot.queryParams?.['id']
    )

    this.zona.push(this.zonaReal.data)
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
