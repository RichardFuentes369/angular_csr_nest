import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { _PAGE_BACK_HOME, _PAGE_NOT_FOUND_FINAL, _PAGE_WITHOUT_PERMISSION_ADMIN, _PAGE_WITHOUT_PERMISSION_FINAL, STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';
import { TranslateService } from '@ngx-translate/core';

export const adminGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const translate = inject(TranslateService)

  const adminToken = (localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN) != "") ? localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN) : "";
  const finalToken = (localStorage.getItem(STORAGE_KEY_TOKEN_FINAL) != "") ? localStorage.getItem(STORAGE_KEY_TOKEN_FINAL) : "";
  
  const token = adminToken || finalToken || null;

  if (token === null ) {
    const mensaje = translate.instant('mod-users.CONSOLE_ERROR_INVALID_TOKEN');
    console.log(mensaje)
    return router.navigate([_PAGE_BACK_HOME])
  }
  
  if (token!= null && adminToken) {
    const mensaje = translate.instant('mod-users.CONSOLE_MSJ_REDIRECTING_TO_ADMIN');
    console.log(mensaje)
    return true
  }
  
  if (token!= null && finalToken) {
    const mensaje = translate.instant('mod-users.CONSOLE_MSJ_FORBIDDEN_TO_ADMIN');
    console.error(mensaje);
    return router.navigate([_PAGE_NOT_FOUND_FINAL])
  }
  
  return router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN])
};

