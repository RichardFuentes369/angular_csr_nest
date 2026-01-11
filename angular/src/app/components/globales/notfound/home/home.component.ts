import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { _PAGE_BACK_HOME } from '@const/app.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-globales-home-not-found',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeNotFoundComponent {

  constructor(
  ) { }

  public _PAGE_BACK_HOME = _PAGE_BACK_HOME
  

}
