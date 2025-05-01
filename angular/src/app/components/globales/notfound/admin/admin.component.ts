import { Component } from '@angular/core';
import { Router } from '@angular/router'

import { TranslateModule, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminnotFoundComponent {

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
