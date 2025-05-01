import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { TranslateModule, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UsernotFoundComponent{

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  calculateMinHeight(): number {
    let data = window.innerHeight - (window.innerHeight/5)
    return data;
  }

  idiomaCambiar(valor: string){
    this.translate.use(valor)
  }


}
