import { Component } from '@angular/core';
import { LoginComponent } from '@component/globales/login/login.component';

@Component({
  selector: 'app-mod-main-login',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class MainLoginComponent {

}
