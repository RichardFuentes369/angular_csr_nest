import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

// Paquete para peticiones http
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

// Paquete para traducción
import {
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import {
  ModuleTranslateLoader,
  IModuleTranslationOptions
} from '@larscom/ngx-translate-module-loader';

// Paquete para formularios
import { FormsModule } from '@angular/forms';

// Configuración de rutas
import { AppRoutingModule } from './app-routing.module';

// Plantillas

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';

export function createTranslateLoader(http: HttpClient) {
  const baseTranslateUrl = './assets/i18n';
  const options: IModuleTranslationOptions = {
    modules: [
      // inicio globales
      { baseTranslateUrl, moduleName: 'components/globales/breadcrumb', namespace: 'global-breadcrumb' },
      { baseTranslateUrl, moduleName: 'components/globales/idioma', namespace: 'global-idioma' },
      { baseTranslateUrl, moduleName: 'components/globales/loading', namespace: 'global-loading' },
      { baseTranslateUrl, moduleName: 'components/globales/login', namespace: 'global-login' },
      { baseTranslateUrl, moduleName: 'components/globales/search', namespace: 'global-search' },
      { baseTranslateUrl, moduleName: 'components/globales/modal', namespace: 'global-modal' },
      { baseTranslateUrl, moduleName: 'components/globales/notfound', namespace: 'global-notfound' },
      { baseTranslateUrl, moduleName: 'components/globales/tablecrud', namespace: 'global-tablecrud' },
      // fin globales

      // inicio layout
      { baseTranslateUrl, moduleName: 'layout/admin', namespace: 'layout-admin' },
      { baseTranslateUrl, moduleName: 'layout/index', namespace: 'layout-index' },
      { baseTranslateUrl, moduleName: 'layout/user', namespace: 'layout-user' },
      // fin layout

      // inicio modulos
      { baseTranslateUrl, moduleName: 'module/basico', namespace: 'pages-basico'},
      { baseTranslateUrl, moduleName: 'module/usuarios', namespace: 'pages-usuarios'},
      { baseTranslateUrl, moduleName: 'module/modulos', namespace: 'pages-modulos'},
      { baseTranslateUrl, moduleName: 'module/mantenimiento', namespace: 'pages-mantenimiento'},
      { baseTranslateUrl, moduleName: 'module/proveedor', namespace: 'pages-proveedor'},
      { baseTranslateUrl, moduleName: 'module/zonaComun', namespace: 'pages-zonaComun'},
      // fin modulos
    ]
  };
  return new ModuleTranslateLoader(http, options);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
    RouterModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
