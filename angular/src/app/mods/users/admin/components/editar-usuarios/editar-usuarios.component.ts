import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { FinalService } from '@mod/users/admin/pages/finales/service/final.service';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2'
import { ocultarModalOscura } from '@function/System';
import { AvatarComponent } from '@component/globales/avatar/avatar.component';
import { STORAGE_KEY_PROFILE } from '@const/app.const';

interface AdministradorInterface {
  'id': number,
  'firstName': string,
  'lastName': string,
  'email': string,
  'password': string,
  'isActive': boolean,
}

@Component({
  selector: 'app-editar-usuarios',
  standalone: true,
  imports: [TranslateModule, FormsModule, AvatarComponent],
  templateUrl: './editar-usuarios.component.html',
  styleUrl: './editar-usuarios.component.scss'
})
export class EditarUsuariosComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private principalService :PrincipalService,
    private finalService :FinalService,
    private translate: TranslateService
  ) { }

  model = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isActive: 0
  }

  user: AdministradorInterface[] = []
  usuarioReal: any

  async ngOnInit() {
    this.user = []

    if(this.route.snapshot.queryParams?.['rol'] === 'admin'){
      this.usuarioReal = await this.finalService.getDataUser(
        this.route.snapshot.queryParams?.['id']
        )
      }

    if(this.route.snapshot.queryParams?.['rol'] === 'user'){
      this.usuarioReal = await this.principalService.getDataUser(
        this.route.snapshot.queryParams?.['id']
      )
    }
    this.user.push(this.usuarioReal.data)

    this.model.id = this.usuarioReal.data.id
    this.model.firstName = this.usuarioReal.data.firstName
    this.model.lastName = this.usuarioReal.data.lastName
    this.model.email = this.usuarioReal.data.email
    this.model.password = this.usuarioReal.data.password
    this.model.isActive = this.usuarioReal.data.isActive
  }

  typefield = 'password'

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  showPassword(){
    this.typefield = (this.typefield === "password") ? "text" : "password"
  }

  async actualizarData(){

    let complemento = localStorage.getItem(STORAGE_KEY_PROFILE)
    let endPoint

    if(complemento == 'admin'){
      endPoint = this.principalService
    }else{
      endPoint = this.finalService
    }

    await endPoint.updateUser(
      {
        "firstName": this.model.firstName,
        "lastName": this.model.lastName,
        "email": this.model.email,
        "password": this.model.password,
        "isActive": this.model.isActive
      },
      this.model.id
    ).then((response) =>{
      ocultarModalOscura()
      this.translate.get('mod-users.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
        Swal.fire({
          title: this.translate.instant('mod-users.Swal.TitleUpdate'),
          text: this.translate.instant('mod-users.Swal.TitleRegisterUpdated'),
          icon: "success"
        });
      })
    }).catch(async error => {
      this.ngOnInit()
      if(typeof(error.response.data.message) == 'string'){
        Swal.fire(error.response.data.message);
      }else{
        Swal.fire(error.response.data.message[0]);
      }
    })
  }
}
