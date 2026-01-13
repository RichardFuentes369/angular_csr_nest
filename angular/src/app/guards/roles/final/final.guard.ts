import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { _PAGE_BACK_HOME, _PAGE_WITHOUT_PERMISSION_FINAL, STORAGE_KEY_FINAL_AUTH, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';

export const finalGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const token = localStorage.getItem(STORAGE_KEY_TOKEN_FINAL)
  const isFinal = await authService.isAuth(STORAGE_KEY_FINAL_AUTH);
  if (isFinal) {
    console.log('Redirigiendo a final');
    return true
  }else{
    return router.navigate([_PAGE_WITHOUT_PERMISSION_FINAL])
  }
};



