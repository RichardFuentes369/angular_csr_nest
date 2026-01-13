import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { _PAGE_BACK_HOME, _PAGE_NOT_FOUND_FINAL, _PAGE_WITHOUT_PERMISSION_ADMIN, _PAGE_WITHOUT_PERMISSION_FINAL, STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';

export const adminGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const isAdmin = !!localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN);
  const isFinal = !!localStorage.getItem(STORAGE_KEY_TOKEN_FINAL);

  // const isAdmin = await authService.isAuth(STORAGE_KEY_ADMIN_AUTH);
  if (isAdmin) {
    console.log('Redirigiendo a Admin')
    return true
  }

  if (isFinal) {
    console.error('Acceso prohibido: Eres usuario final, no admin');
    return router.navigate([_PAGE_NOT_FOUND_FINAL])
  }
  
  return router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN])
};

