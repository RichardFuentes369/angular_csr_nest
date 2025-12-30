import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { STORAGE_KEY_FINAL_AUTH } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';

export const finalGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if(await authService.isAuth(STORAGE_KEY_FINAL_AUTH)){
    return true
  }else{
    const url = router.navigate(['/home/ingreso/user']);
    return url;
  }
};
