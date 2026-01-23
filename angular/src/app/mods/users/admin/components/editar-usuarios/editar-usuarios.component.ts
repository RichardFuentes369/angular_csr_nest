import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { FinalService } from '@mod/users/admin/pages/finales/service/final.service';

import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

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
  'isActive': number,
}

@Component({
  selector: 'app-editar-usuarios',
  standalone: true,
  imports: [TranslateModule, FormsModule, AvatarComponent],
  templateUrl: './editar-usuarios.component.html',
  styleUrl: './editar-usuarios.component.scss'
})
export class EditarUsuariosComponent implements OnInit{

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private principalService: PrincipalService,
    private finalService: FinalService,
    private translate: TranslateService
  ) {
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  optionSelect = 0

  model = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isActive: 0
  }

  validators = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    selectHas: false,
  }

  user: AdministradorInterface[] = []
  usuarioReal: any

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.validators.firstName = (this.model.firstName.length === 0)
    this.validators.lastName = (this.model.lastName.length === 0)
    this.validators.email = (this.model.email.length === 0 || !regexEmail.test(this.model.email))
    this.validators.password = (this.model.password.length === 0)
    this.validators.selectHas = (this.optionSelect == 0)

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (!this.validators.firstName && !this.validators.lastName && !this.validators.email && !this.validators.password && !this.validators.selectHas) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.firstName && !this.validators.lastName && !this.validators.email && !this.validators.password && !this.validators.selectHas
  }

  async ngOnInit() {
    this.user = []

    switch (this.route.snapshot.queryParams?.['rol']) {
      case 'admin':
        this.usuarioReal = await this.principalService.getDataUser(
          this.route.snapshot.queryParams?.['id']
        )
        break;
      case 'user':
        this.usuarioReal = await this.finalService.getDataUser(
          this.route.snapshot.queryParams?.['id']
          )
        break;
    }
    
    this.user.push(this.usuarioReal.data)

    this.model.id = this.usuarioReal.data.id
    this.model.firstName = this.usuarioReal.data.firstName
    this.model.lastName = this.usuarioReal.data.lastName
    this.model.email = this.usuarioReal.data.email
    this.model.password = this.usuarioReal.data.password
    this.model.isActive = (this.usuarioReal.data.isActive) ? 1 : 2
    this.optionSelect = (this.usuarioReal.data.isActive) ? 1 : 2
  }

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  async actualizarData(){

    if(this.isFormValid){
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
          "isActive": (this.optionSelect == 1) ? true : false
        },
        this.model.id
      ).then((response) =>{
        ocultarModalOscura()
        this.translate.get('mod-users.SWAL_ARE_YOU_SURE_UPDATE_USER').subscribe((translatedTitle: string) => {
          Swal.fire({
            title: this.translate.instant('mod-users.SWAL_UPDATED'),
            text: this.translate.instant('mod-users.SWAL_UPDATED_RECORD'),
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
}
