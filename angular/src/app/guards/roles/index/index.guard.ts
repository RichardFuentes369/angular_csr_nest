import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_FINAL_AUTH, STORAGE_KEY_TOKEN, STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';

export const indexGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const adminToken = (localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN) != "") ? localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN) : "";
  const finalToken = (localStorage.getItem(STORAGE_KEY_TOKEN_FINAL) != "") ? localStorage.getItem(STORAGE_KEY_TOKEN_FINAL) : "";
  
  const token = adminToken || finalToken || null;

  if(token!= null && adminToken && await authService.isAuth(STORAGE_KEY_ADMIN_AUTH)){
    const url = router.navigate(['/admin/me/perfil']);
    return url;
  }else if(token!= null &&finalToken && await authService.isAuth(STORAGE_KEY_FINAL_AUTH)){
    const url = router.navigate(['/final/me/perfil']);
    return url;
  }else{
    localStorage.removeItem(STORAGE_KEY_TOKEN_ADMIN)
    localStorage.removeItem(STORAGE_KEY_TOKEN_FINAL)
    return true
  }
};
