import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MAIN_MENU } from '@const/app.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-final',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './final.component.html',
  styleUrl: './final.component.scss',
})
export class FinalComponent {

  constructor(
  ) { }

  public MAIN_MENU = MAIN_MENU
}
