import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { _PAGE_BACK_ADMIN } from '@const/app.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-globales-admin-not-found',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminNotFoundComponent {

  constructor(
  ) {}

  public _PAGE_BACK_ADMIN = _PAGE_BACK_ADMIN

}
