import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { _PAGE_BACK_HOME, STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const';

export const indexGuard: CanActivateFn = async(route, state) => {
  const router = inject(Router)
  // const token_admin = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)
  // const token_user = localStorage.getItem(STORAGE_KEY_TOKEN_FINAL)
  return router.navigate(['/home/inicio']);
  // return !token_admin && !token_user ? true : false
};

/*
import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_FINAL_AUTH, STORAGE_KEY_TOKEN } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';
import { LAYOUT_ADMIN_PAGE_PROFILE } from '@mod/me/const/me.const';

export const indexGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const token = localStorage.getItem(STORAGE_KEY_TOKEN)

  if (!token) {
    return true; 
  }

  try {
    const isAdmin = await authService.isAuth(STORAGE_KEY_ADMIN_AUTH);
    if (isAdmin) {
      console.log('Redirigiendo a Admin');
      return await router.navigate(['/admin/' + LAYOUT_ADMIN_PAGE_PROFILE]);
    }
    const isFinal = await authService.isAuth(STORAGE_KEY_FINAL_AUTH);
    if (isFinal) {
      return await router.navigate(['/final/' + LAYOUT_ADMIN_PAGE_PROFILE]);
    }
    if (await authService.isAuth(STORAGE_KEY_ADMIN_AUTH)) {
      console.log('Redirigiendo a Usuario Final');
      return await router.navigate(['/admin/' + LAYOUT_ADMIN_PAGE_PROFILE]);
    }
    
    if (await authService.isAuth('STORAGE_KEY_FINAL_AUTH')) {
      return await router.navigate(['/final/' + LAYOUT_ADMIN_PAGE_PROFILE]);
    }
  } catch (error) {
    console.error('Token inválido o vencido', error);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  }

  console.log('No tiene roles válidos, al inicio');
  return router.navigate(['/home/inicio']);
};
*/