import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';

export const adminGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if(await authService.isAuth('authadmin')){
    return true
  }else{
    const url = router.navigate(['/inicio/ingreso/admin']);
    return url;
  }
};
