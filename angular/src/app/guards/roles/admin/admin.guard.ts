import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';

export const adminGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if(await authService.isAuth(STORAGE_KEY_ADMIN_AUTH)){
    return true
  }else{
    const url = router.navigate(['/home/ingreso/admin']);
    return url;
  }
};
