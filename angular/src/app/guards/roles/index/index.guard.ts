import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { _PAGE_ADMIN_PROFILE, _PAGE_FINAL_PROFILE, STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_FINAL_AUTH, STORAGE_KEY_TOKEN, STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';
import { TranslateService } from '@ngx-translate/core';

export const indexGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const translate = inject(TranslateService)

  const adminToken = (localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN) != "") ? localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN) : "";
  const finalToken = (localStorage.getItem(STORAGE_KEY_TOKEN_FINAL) != "") ? localStorage.getItem(STORAGE_KEY_TOKEN_FINAL) : "";
  
  const token = adminToken || finalToken || null;

  if(token!= null && adminToken && await authService.isAuth(STORAGE_KEY_ADMIN_AUTH)){
    const url = router.navigate([_PAGE_ADMIN_PROFILE]);
    return url;
  }else if(token!= null &&finalToken && await authService.isAuth(STORAGE_KEY_FINAL_AUTH)){
    const url = router.navigate([_PAGE_FINAL_PROFILE]);
    return url;
  }else{
    localStorage.removeItem(STORAGE_KEY_TOKEN_ADMIN)
    localStorage.removeItem(STORAGE_KEY_TOKEN_FINAL)
    return true
  }
};
