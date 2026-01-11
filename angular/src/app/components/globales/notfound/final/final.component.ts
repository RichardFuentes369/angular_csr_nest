import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { _PAGE_BACK_FINAL } from '@const/app.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-globales-final-not-found',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './final.component.html',
  styleUrl: './final.component.scss',
})
export class FinalNotFoundComponent {
  constructor(
  ) {}

  public _PAGE_BACK_FINAL = _PAGE_BACK_FINAL
}
