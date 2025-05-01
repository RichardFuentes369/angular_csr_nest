import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexnotFoundComponent {

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
