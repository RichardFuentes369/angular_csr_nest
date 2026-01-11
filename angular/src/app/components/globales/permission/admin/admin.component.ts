import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MAIN_MENU } from '@const/app.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminPermissionComponent {

  constructor(
  ) { }

  public MAIN_MENU = MAIN_MENU

}
