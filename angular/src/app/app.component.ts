
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'template01';                                                                                                         

  constructor(
    private translate: TranslateService,
    private _cookies: CookieService,
    private router: Router
  ){
    this._cookies.delete('languague')
    this._cookies.set('languague', 'es')
    this.translate.use('es');
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

}
