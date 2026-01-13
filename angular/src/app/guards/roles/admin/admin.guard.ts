import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { _PAGE_BACK_HOME, _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_TOKEN_ADMIN } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';

export const adminGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)
  const isAdmin = await authService.isAuth(STORAGE_KEY_ADMIN_AUTH)
  if (isAdmin) {
    console.log('Redirigiendo a Admin')
    return true
  }else{
    return router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN])
  }
};
